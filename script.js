const DEFAULT_SLIDER_CONFIG = {
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  showProgress: true,
  showValue: true,
  showControls: true,
  showIndicators: false,
  pauseOnHover: true,
  unit: ''
};

class RangeSlider {
  constructor(selector, userConfig = {}) {
    this.container = document.querySelector(selector);
    if (this.container) {
      this.config = { ...DEFAULT_SLIDER_CONFIG, ...userConfig };
      this.isDragging = false;
      this.isHovered = false;
      this.indicators = [];
      this.value = this.normalizeValue(this.config.value);

      this.render();
      this.bindEvents();
      this.updateUI(this.value);
    }
  }

  normalizeValue(rawValue) {
    const min = Number(this.config.min);
    const max = Number(this.config.max);
    const step = Number(this.config.step) > 0 ? Number(this.config.step) : 1;
    const numericValue = Number(rawValue);

    if (Number.isNaN(numericValue)) {
      return this.value;
    }

    const clamped = Math.min(max, Math.max(min, numericValue));
    const stepsCount = Math.round((clamped - min) / step);
    const stepped = min + stepsCount * step;

    return Number(Math.min(max, Math.max(min, stepped)).toFixed(6));
  }

  getPercent(val) {
    const min = Number(this.config.min);
    const max = Number(this.config.max);
    if (max === min) {
      return 0;
    }
    return ((val - min) / (max - min)) * 100;
  }

  render() {
    this.container.innerHTML = '';
    this.indicators = [];

    if (this.config.showControls) {
      this.prevBtn = document.createElement('button');
      this.prevBtn.type = 'button';
      this.prevBtn.className = 'range-slider__btn range-slider__btn--prev';
      this.prevBtn.textContent = '−';
      this.prevBtn.setAttribute('aria-label', 'Уменьшить значение');
      this.container.append(this.prevBtn);
    }

    this.controlEl = document.createElement('div');
    this.controlEl.className = 'range-slider__control';

    this.trackEl = document.createElement('div');
    this.trackEl.className = 'range-slider__track';

    this.progressEl = document.createElement('div');
    this.progressEl.className = 'range-slider__progress';
    if (this.config.showProgress === false) {
      this.progressEl.style.display = 'none';
    }

    this.thumbEl = document.createElement('div');
    this.thumbEl.className = 'range-slider__thumb';

    this.inputEl = document.createElement('input');
    this.inputEl.type = 'range';
    this.inputEl.className = 'range-slider__input';
    this.inputEl.min = String(this.config.min);
    this.inputEl.max = String(this.config.max);
    this.inputEl.step = String(this.config.step);
    this.inputEl.value = String(this.value);

    this.trackEl.append(this.progressEl);
    this.controlEl.append(this.trackEl, this.thumbEl, this.inputEl);

    if (this.config.showIndicators) {
      this.renderIndicators();
    }

    this.container.append(this.controlEl);

    if (this.config.showControls) {
      this.nextBtn = document.createElement('button');
      this.nextBtn.type = 'button';
      this.nextBtn.className = 'range-slider__btn range-slider__btn--next';
      this.nextBtn.textContent = '+';
      this.nextBtn.setAttribute('aria-label', 'Увеличить значение');
      this.container.append(this.nextBtn);
    }

    if (this.config.showValue) {
      this.valueWrapEl = document.createElement('div');
      this.valueWrapEl.className = 'range-slider__value-wrap';

      this.valueEl = document.createElement('input');
      this.valueEl.type = 'number';
      this.valueEl.className = 'range-slider__value';
      this.valueEl.min = String(this.config.min);
      this.valueEl.max = String(this.config.max);
      this.valueEl.step = String(this.config.step);
      this.valueEl.value = String(this.value);
      this.valueWrapEl.append(this.valueEl);

      if (this.config.unit && this.config.unit.trim() !== '') {
        this.unitEl = document.createElement('span');
        this.unitEl.className = 'range-slider__unit';
        this.unitEl.textContent = this.config.unit.trim();
        this.valueWrapEl.append(this.unitEl);
      }

      this.container.append(this.valueWrapEl);
    }
  }

  renderIndicators() {
    const min = Number(this.config.min);
    const max = Number(this.config.max);
    const step = Number(this.config.step) > 0 ? Number(this.config.step) : 1;
    const totalSteps = Math.floor((max - min) / step);

    if (totalSteps > 0 && totalSteps <= 25) {
      const indicatorsWrap = document.createElement('div');
      indicatorsWrap.className = 'range-slider__indicators';

      for (let i = 0; i <= totalSteps; i += 1) {
        const tickValue = Number(Math.min(max, min + i * step).toFixed(6));
        const dot = document.createElement('span');
        dot.className = 'range-slider__indicator';
        dot.style.left = `${this.getPercent(tickValue)}%`;
        dot.dataset.value = String(tickValue);
        this.indicators.push(dot);
        indicatorsWrap.append(dot);
      }

      this.controlEl.append(indicatorsWrap);
    }
  }

  updateValueFromClientX(clientX) {
    const rect = this.controlEl.getBoundingClientRect();
    if (rect.width > 0) {
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const min = Number(this.config.min);
      const max = Number(this.config.max);
      const rawValue = min + ratio * (max - min);

      this.setValue(rawValue);
    }
  }

  setValue(nextValue) {
    this.value = this.normalizeValue(nextValue);
    this.updateUI(this.value);
  }

  stepUp() {
    const step = Number(this.config.step) > 0 ? Number(this.config.step) : 1;
    this.setValue(this.value + step);
  }

  stepDown() {
    const step = Number(this.config.step) > 0 ? Number(this.config.step) : 1;
    this.setValue(this.value - step);
  }

  updateUI(val) {
    const percent = this.getPercent(val);

    if (this.thumbEl) {
      this.thumbEl.style.left = `${percent}%`;
    }

    if (this.progressEl) {
      this.progressEl.style.width = `${percent}%`;
    }

    if (this.inputEl && Number(this.inputEl.value) !== val) {
      this.inputEl.value = String(val);
    }

    if (this.valueEl) {
      this.valueEl.value = String(val);
    }

    if (this.indicators.length > 0) {
      this.indicators.forEach((dot) => {
        const dotValue = Number(dot.dataset.value);
        dot.classList.toggle('is-active', dotValue <= val);
      });
    }
  }

  bindEvents() {
    if (this.controlEl && this.inputEl) {
      this.inputEl.addEventListener('input', (e) => {
        this.setValue(e.target.value);
      });

      this.controlEl.addEventListener('pointerdown', (e) => {
        this.isDragging = true;
        this.controlEl.classList.add('is-dragging');
        this.controlEl.setPointerCapture(e.pointerId);
        this.updateValueFromClientX(e.clientX);
      });

      this.controlEl.addEventListener('pointermove', (e) => {
        if (this.isDragging) {
          this.updateValueFromClientX(e.clientX);
        }
      });

      const stopDragging = (e) => {
        if (this.isDragging) {
          this.isDragging = false;
          this.controlEl.classList.remove('is-dragging');
          if (e && this.controlEl.hasPointerCapture && this.controlEl.hasPointerCapture(e.pointerId)) {
            this.controlEl.releasePointerCapture(e.pointerId);
          }
        }
      };

      this.controlEl.addEventListener('pointerup', stopDragging);
      this.controlEl.addEventListener('pointercancel', stopDragging);
    }

    if (this.valueEl) {
      const applyNumberInput = () => {
        this.setValue(this.valueEl.value);
      };

      this.valueEl.addEventListener('change', applyNumberInput);
      this.valueEl.addEventListener('blur', applyNumberInput);
      this.valueEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          applyNumberInput();
          this.valueEl.blur();
        }
      });
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.stepDown();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.stepUp();
      });
    }

    if (this.config.pauseOnHover && this.container) {
      this.container.addEventListener('mouseenter', () => {
        this.isHovered = true;
        this.container.classList.add('is-hovered');
      });

      this.container.addEventListener('mouseleave', () => {
        this.isHovered = false;
        this.container.classList.remove('is-hovered');
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const slider1 = new RangeSlider('#range-slider-1', {
    min: 0,
    max: 100,
    step: 10,
    value: 30,
    showProgress: true,
    showValue: true,
    showControls: true,
    showIndicators: false,
    pauseOnHover: true,
    unit: '%'
  });

  const slider2 = new RangeSlider('#range-slider-2', {
    min: 0,
    max: 500,
    step: 50,
    value: 150,
    showProgress: true,
    showValue: true,
    showControls: true,
    showIndicators: false,
    pauseOnHover: true,
    unit: ' px'
  });
});
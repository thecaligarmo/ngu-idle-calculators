
export function setInputValue(input, value) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      ).set;
      nativeInputValueSetter.call(input, value);

      var event = new Event('input', {bubbles : true});
      input.dispatchEvent(event);
}
export class DigitValidator {
  validateOnlyNumberThreeDigits(event: any) {
    let centinel = false;
    let inputValue = event.target.value + event;
    if (inputValue.length > 4) {
      centinel = true;
    }
    if (inputValue.split(".")[1] && inputValue.split(".")[1].length > 1) {
      centinel = true;
    }
    return centinel;
  }




  validateNumericAndPoint(caracter: any) {
    const exprReg = /^[0-9]*\.?[0-9]*$/;
    let centinel = false;

    if (exprReg.test(caracter)) {
      centinel = true;
    }
    return centinel;
  }

  validateSubPartida(caracter: any) {
    const exprReg = /^[0-9]{4}[.][0-9]{2}[.][0-9]{2}[.][0-9]{2}$/;
    let centinel = false;
    if (exprReg.test(caracter)) {
      centinel = true;
    }

    return centinel;
  }
  validateDecimal(input: any) {
    const exprReg = /^[0-9]+([.][0-9]+)?$/
    if (exprReg.test(input)) return true;
    return false;
  }
  
  validateOnlyNumber(num: any) {
    const numberCodeASCII = num.keyCode;
    let centinel = false;
    if (numberCodeASCII >= 48 && numberCodeASCII <= 57) {
      centinel = true;
    }
    return centinel;
  }
  validateDecimalNumber(dig: any) {
    const numberCodeASCII = dig.keyCode;
    let centinel = false;
    if (
      (numberCodeASCII >= 48 && numberCodeASCII <= 57) ||
      numberCodeASCII === 46
    ) {
      centinel = true;
    }
    return centinel;
  }
  validateOnlyLetter(caracter: any) {
    const exprReg = /^[a-zA-Z_áéíóúñÑÁÉÍÓÚ\s]*$/;
    let centinel = false;

    if (exprReg.test(caracter)) {
      centinel = true;
    }
    return centinel;
  }
  validateOnlyLetter2(caracter: any) {
    const exprReg = /^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]*$/;
    let centinel = false;

    if (exprReg.test(caracter)) {
      centinel = true;
    }
    return centinel;
  }
  validateAlphanumeric(caracter: any) {
    const exprReg = /^[0-9a-zA-Z_áéíóúñÑÁÉÍÓÚ\s]*$/;
    let centinel = false;

    if (exprReg.test(caracter)) {
      centinel = true;
    }
    return centinel;
  }

  validateNumeric(caracter: any) {
    const exprReg = /^[0-9]*$/; //pendiente en investigación
    let centinel = false;

    if (exprReg.test(caracter)) {
      centinel = true;
    }
    return centinel;
  }

  validateAlphanumericCSG(caracter: any) {//////
    const exprReg = /^[0-9a-zA-Z_/áéíóúñÑÁÉÍÓÚ\s-]*$/;
    let centinel = false;

    if (exprReg.test(caracter)) {
      centinel = true;
    }
    return centinel;
  }
  validateAlfaNumerico(input: any) {
    var regularExpression = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/;
    var valid = regularExpression.test(input);
    return valid;
  }
  validateMayuscula(input: any) {
    var regularExpression = /^[A-Z]*$/;
    var valid = regularExpression.test(input);
    return valid;
  }
  
  validateMayusculaconBarra(input: any) {
    var regularExpression = /[A-Z/]/;
    var valid = regularExpression.test(input);
    return valid;
  }

  validateCaracter(caracter: any) {
    const exprReg = /^[:/?*<>_|"\\]$/;
    let centinel = false;
    if (exprReg.test(caracter)) {
      centinel = true;
    }
    return centinel;
  }
  // validateOnlyNumber(event: any) {
  //   return this.digitValidator.validateOnlyNumber(event);
  // }
  // validateOnlyLetter(event: any) {
  //   return this.digitValidator.validateOnlyLetter(event.key);
  // }
  // validateAlphanumeric(event: any) {
  //   return this.digitValidator.validateAlphanumeric(event.key);
  // }

}

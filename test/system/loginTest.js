/******************************************************************************
 * 
 * This file is part of Serleena-Frontend
 * 
 * The MIT License (MIT)
 *
 * Copyright (C) 2015 Antonio Cavestro, Matteo Lisotto.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to 
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 *****************************************************************************/


/**
 * Name: LoginTest
 * Package: Authentication
 * Author: Antonio Cavestro <antonio.cavestro@gmail.com>
 *
 * History
 * Version    Programmer        Changes
 * 1.0.0      Antonio Cavestro    Crea file e test
 *
 */

describe('La pagina di login', function () {

  it('dovrebbe permettere al visitatore di fare login', function () {
    browser.get('#/');
    element(by.model('email')).sendKeys(browser.params.login.email);
    element(by.model('password')).sendKeys(browser.params.login.password);
    element(by.buttonText('Accedi')).click();

    browser.getCurrentUrl().then( function (actualUrl) {
      expect(actualUrl).toBe(browser.baseUrl + '#/dashboard');
    });
  });
  
});

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
  * Name: DeleteExperienceListControllerTest
  * Package: Experience
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per LoginController
  *
  */

describe('DeleteExperienceController Test', function () {
    var $scope, routeParams, experienceService;
    
    beforeEach(module('experience'));

    beforeEach(inject(function($controller) {
	$scope = {};
	routeParams = {};
	routeParams.experienceId = 1;
	
	experienceService = jasmine.createSpyObj('ExperienceService',
						 ['deleteExperience']);
	experienceService.deleteExperience.and.callFake(function (id, callback) {
	    if (id == 1) {
		callback(true, '');
	    } else {
		callback(false, '');
	    }
	});

	$controller('DeleteExperienceController', {
	    $scope: $scope,
	    $routeParams: routeParams,
	    ExperienceService: experienceService
	});
    }));

    it('Successfully DeleteExperience', function () {
	expect($scope.experienceId).toBe(1);
	expect($scope.deleteRequested).toBe(false);
	expect($scope.responseType).toBe('');
	expect($scope.responseMsg).toBe('');

	$scope.deleteExperience();

	expect($scope.deleteRequested).toBe(true);
	expect($scope.responseType).toBe('success');
	expect($scope.responseMsg).toBe('Esperienza cancellata.');
    });

    it('Wrong DeleteExperience', function () {
	expect($scope.experienceId).toBe(1);
	expect($scope.deleteRequested).toBe(false);
	expect($scope.responseType).toBe('');
	expect($scope.responseMsg).toBe('');

	$scope.experienceId = 2;
	$scope.deleteExperience();

	expect($scope.deleteRequested).toBe(true);
	expect($scope.responseType).toBe('danger');
	expect($scope.responseMsg).toBe("Errore nella cancellazione dell'esperienza. :(");
    });
});

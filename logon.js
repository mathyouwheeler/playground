/**
 * @namespace Lowes
 * Common AccessMyLowes Functionality.
 */
(function ($, Lowes) {

	Lowes = window.Lowes || {};

	/**
	 * Lowes AccessMyLowes Parent Level Object ()
	 */
	Lowes.AccessMyLowes = {

		component: null, // jQuery Object
		options: null, // Object
		$serviceViewHBSTemplate: null,
		serviceViewSelector: '.js-accessmylowes-service-view',

		init: function() {
			this.bindUI();
		},

		/**
		 * Logon iFrame
		 */
		bindUI: function() {
			var that = this;
			// Set up options for access my lowes component
			that.$component = $('.js-accessmylowes');
			that.$serviceViewHBSTemplate = $('#AccessMyLowesServiceView');
			that.$component.attr('data-options', JSON.stringify({inModal: true}));
			// Set Up Defaults/Options
			that.options = that.$component.data('options');
			// Bind Validation To Login Form
			Lowes.AccessMyLowes.bindLoginForm();
			// Bind Event to Login Form
			$(document).on('submit', '#login', that.signInFormHandler);
			// Render Forgot Password Form When Selector is Clicked
			$(document).on('click', '.js-goto-forgot', that.renderForgotYourPasswordView);
			// Bind Event to Reset Password Form
			$(document).on('submit', '#resetPassword', that.forgotYourPasswordFormHandler);
			// Render Login Form When Selector is Clicked
			$(document).on('click', '.js-goto-login', that.renderAccountLoginView);
		},


		/**
		 * Bind Login Form
		 * and related UI
		 */
		bindLoginForm: function() {
			Scaffold.Constants.Validation.defaults.rules['password-input'] = {
				password: false,
				required: true,
				minlength: 6
			};
			Scaffold.Constants.Validation.defaults.messages['password-input'] = {
				required: Scaffold.Constants.Validation.defaults.messages.password.required,
				minlength: Scaffold.Constants.Validation.defaults.messages.password.minlength
			};
			Lowes.Utils.bindValidation($('#login'));
			Lowes.AccessMyLowes.selectFirstInput($('.js-account-login'));
		},


		/**
		 * Renders Account Login View
		 */
		renderAccountLoginView: function(e) {
			if(e){
				e.preventDefault();
			}
			if ( !$('.js-account-login').length ){
				Lowes.Utils.render($("#AccountLoginView"), '', function(html){
					Lowes.AccessMyLowes.$component.html(html);
					Lowes.AccessMyLowes.bindLoginForm();
				});
			}
		},



		/**
		 * Renders Forgot Your Password View
		 * @param e
		 */
		renderForgotYourPasswordView: function (e) {
			var selector = '.js-reset-password-slide';
			if(e){
				e.preventDefault();
			}
			var context = '';
			if($(this).data('restore')){
				context = Lowes.AccessMyLowes.payload;
			}
			if ( !$(selector).length ) {
				Lowes.Utils.render($("#ForgotYourPasswordView"), context, function(html){
					Lowes.AccessMyLowes.$component.html(html);
					Lowes.Utils.bindValidation($('#resetPassword'));
					Lowes.AccessMyLowes.selectFirstInput($(selector));
				});
			}
		},



		/**
		 * Select First Input in Slide
		 * @param $context
		 */
		selectFirstInput: function($context){
			var firstInput = 'input:first';
			if ($context.find(firstInput).val() > 1) {
				$context.find(firstInput).focus();
			} else {
				$context.find(firstInput).select();
			}
		},



		/** Lowes.AccessMyLowes.signInFormHandler();
		 * Used for the Sign in Modal
		 * Requires the Lowes.Utils.login() function.
		 * **/
		signInFormHandler: function (e) {
			var $thatForm = $(this);
			e.preventDefault();
			var successCallback = null;
			var errorCallback = null;
			if ( Lowes.AccessMyLowes.options.inModal ) {
				successCallback = function() {
					if ( // Send to Cart if in Legacy Desktop Checkout Funnel
						document.referrer.search('OrderProcess') >= 0 || document.referrer.search('OrderDisplayPendingView') >= 0 || document.referrer.search('CheckoutUserLogonFormView') >= 0
					) {
						window.parent.location = '/cart';
					} else if ( // dsd24277 - if on login or sign up pages, push to main landing page
						document.referrer.search('LogonForm') >= 0 || document.referrer.search('UserRegistrationForm') >= 0
					) {
						window.parent.location = '/';
					} else { // anywhere else reload page
						window.parent.location = document.referrer;
					}
				};
				errorCallback = Lowes.AccessMyLowes.signInErrorHandler;
			}
			/** Check to see if form is valid**/
			if ( $thatForm.valid() ) {
				// Run the Sign In
				/** Build Data Object to Send to Lowes Login Function **/
				var data = {
					logonId: $thatForm.find("#email-input").val(),
					logonPassword: $thatForm.find("#password-input").val()
				};
				// Add Order ID if present to properly merge guest + signed in users saved cart
				if (Lowes.User.authToken1 !== "" && Lowes.User.authToken1 !== undefined) {
					var activityIdArray = Lowes.User.authToken1.split("=");
					data.x_activityGuid = activityIdArray[0];
				}
				/** Run the Login and Pass an Inline Success Method to refresh the current page Once Signed in. **/
				Lowes.Utils.login(data, successCallback, errorCallback, false);
			} else {
				// Place other events in here for non-valid forms. Perhaps Analytics.
			}
		},



		/**
		 * Error Handler for Signing In
		 * In-use in Lowes.Utils & Lowes.AccessMyLowes
		 * @param  {String} errorTxt
		 * - Error message to be displayed in the modal error span element
		 * @param  {Boolean} remove
		 * - Hide or show the modal error element
		 * @param  {String} dtmFormError
		 * - Form error message we send to digitalData.form.errorErrors
		 */
		signInErrorHandler: function (errorTxt, remove, dtmFormError) {

			Lowes.Utils.render(Lowes.AccessMyLowes.$serviceViewHBSTemplate, {
				success: true
			}, function(html){
				Lowes.AccessMyLowes.$component.html(html);
				var errorMessagingObject = {};
				if (errorTxt === Lowes.Constants.Error_Messages.FORM_LOCK) {
					errorMessagingObject = {
						html: true,
						title: Lowes.Constants.Error_Messages.FORM_LOCKED[0],
						message: Lowes.Constants.Error_Messages.FORM_LOCKED[1]
					};
				} else {
					errorMessagingObject = {
						html: true,
						message: errorTxt
					};
				}
				Scaffold.Messaging.inject(Lowes.AccessMyLowes.serviceViewSelector, 'error', errorMessagingObject, true);
			});

			try { 
				window.DTMDataHelper.formError('na', dtmFormError);
				_satellite.track('form-failure');
			} catch (e) { 
				console.error('DTM not available');
			}

			Lowes.AccessMyLowes.$component.find('button').focus();

		},



		/**
		 * displayResetPasswordMessage
		 * Display success/error message based on type of response
		 * @param  {string} typeOfResponse 'success' or 'error'
		 */
		displayResetPasswordMessage: function (typeOfResponse) {
			if (typeOfResponse === 'success') {
				Lowes.Utils.render(Lowes.AccessMyLowes.$serviceViewHBSTemplate, {
					success: true
				}, function(html){
					Lowes.AccessMyLowes.$component.html(html);
					Scaffold.Messaging.inject(Lowes.AccessMyLowes.serviceViewSelector, 'success', {
						message: Lowes.AccessMyLowes.$component.data('message'),
						html: true
					}, true);
				});
			} else if (typeOfResponse === 'error') {
				Lowes.Utils.render(Lowes.AccessMyLowes.$serviceViewHBSTemplate, '', function(html){
					Lowes.AccessMyLowes.$component.html(html);
					Scaffold.Messaging.inject(Lowes.AccessMyLowes.serviceViewSelector, 'error', {
						message: Lowes.Constants.Error_Messages.FORM_PASSWORD_RESET
					}, true);
				});
			}

			Lowes.AccessMyLowes.$component.find('button').focus();
		},



		/**
		 * Forgot Your Password Form
		 * In-use in Lowes.AccessMyLowes
		 * @returns {boolean}
		 */
		forgotYourPasswordFormHandler: function (e) {
			var $thatForm = $(this);
			e.preventDefault();
			if ($thatForm.valid()) {
				// Run password reset
				// TODO: Update to deliver first & last name as part of payload depends on service update
				var resetEmailInputVal = $thatForm.find('#reset-email-input').val();
				var payload = JSON.stringify({'logonId': resetEmailInputVal});
				// Temporary Storage of Data
				Lowes.AccessMyLowes.payload = {
					firstName: $thatForm.find('#firstname-input').val(),
					lastName: $thatForm.find('#lastname-input').val(),
					emailAddress: resetEmailInputVal
				};
				$.ajax({
					beforeSend: function () {
						if( window.digitalData.form === undefined) { window.digitalData.form = {}; window.digitalData.form.formErrors =[]; }
						window.digitalData.form.formType = 'forgot_password';
						Lowes.ErrorHandlers = $.extend(Lowes.ErrorHandlers, {
							error_400: function (data) {
							try { 
								window.DTMDataHelper.formError(data.status, data.statusText);
								_satellite.track('form-failure');
							} catch (e) { 
								console.error('DTM not available');
							}
								Lowes.AccessMyLowes.displayResetPasswordMessage('error');
							},
							error_403: function (data) {
							try { 
								window.DTMDataHelper.formError(data.status, data.statusText);
								_satellite.track('form-failure');
							} catch (e) { 
								console.error('DTM not available');
							}
								Lowes.AccessMyLowes.displayResetPasswordMessage('error');
							},
							error_500: function (data) {
							try { 
								window.DTMDataHelper.formError(data.status, data.statusText);
								_satellite.track('form-failure');
							} catch (e) { 
								console.error('DTM not available');
							}
								Lowes.AccessMyLowes.displayResetPasswordMessage('error');
							},
							error: function (data) {
							try { 
								window.DTMDataHelper.formError(data.status, data.statusText);
								_satellite.track('form-failure');
							} catch (e) { 
								console.error('DTM not available');
							}
								Lowes.AccessMyLowes.displayResetPasswordMessage('error');
							}
						});
					},
					contentType: 'application/json', // TODO: This should be moved to Akamai
					data: payload,
					headers: Lowes.Constants.AJAX_FORGOT_PASS_AUTH_HEADER, // TODO: This should be moved to Akamai
					success: function (data) {
						var msg = data.x_responseMessage;
						if (msg === 'SUCCESS: FORGOT PASSWORD EMAIL SENT') {
							Lowes.AccessMyLowes.displayResetPasswordMessage('success');
							if(Lowes.AccessMyLowes.payload){
								Lowes.AccessMyLowes.payload = null;
							}
							try { _satellite.track('form-success'); } catch (e) { console.error("DTM not available"); }
						} else if (msg === 'FAILURE : INVALID logonId') {
							Lowes.AccessMyLowes.displayResetPasswordMessage('error');
							try { 
								window.DTMDataHelper.formError(data.status, data.statusText, msg);
								_satellite.track('form-failure');
							} catch (e) {
								console.error('DTM not available');
							}
						} else if (msg === 'FAILURE: INVALID logonId') {
							Lowes.AccessMyLowes.displayResetPasswordMessage('error');
							try { 
								window.DTMDataHelper.formError(data.status, data.statusText, msg);
								_satellite.track('form-failure');
							} catch (e) {
								console.error('DTM not available');
							}
						}
					},
					type: 'POST',
					url: Lowes.Constants.Urls.FORGOT_PASSWORD_EMAIL_NOTIFICATION
				});

				return true;
			} else {
				// Place other events in here for non-valid forms. Perhaps Analytics.
			}
		}

	};

	Lowes = window.Lowes;

}(jQuery, window.Lowes = window.Lowes || {}));
Lowes.AccessMyLowes.init();
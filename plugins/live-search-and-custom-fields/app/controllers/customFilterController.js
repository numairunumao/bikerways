angular.module(angAppName)
	.controller("pxfilterController", function ($scope, $sce, customFilterService ) {

		var postsPerPage = capfData.post_per_page,
			page = 1;

		var filterID = capfData.ID,
			filterType = '',
			postType = capfData.postType,
			filterFieldsTemplate,
			dataPostsDefault,
			defaultLoadMoreBtnStatus,
			wrapperGeneralClassNames,
			sidebarSection,
			previousSidebarSection,
			rangeField = new px_customRange(),
			customSelectBoxes = new customSelectBox(),
			filterFieldsMethod = new lscfOrderFilterFields(),
			defaultFilter = null,
			filterFieldsAction = new pxFilterFieldsAction();


		$scope.loading = false;
		$scope.noResults = false;
		$scope.morePostsAvailable = false;
		$scope.variations = {};


		$scope.featuredLabel = false;
		$scope.postType = postType;

		$scope.existsPosts = false;
		$scope.filterPostsTemplate = {};

		// methods: ready; afterPostsLoadCallback 
		$scope.directiveInfo = {};

		$scope.liveSearchTemplate = {
			"class":""
		};

		$scope.actionSettings = {
			"style": {
				"postMaxHeight": null
			},
			"customFields":[],
			"pxCurrentPage":page,
			"postsPerPage":postsPerPage,
			"lsLoadPosts":true,
			"activeTerms":[],
			"postsCount":"",
			"pagesCount":"",
			"activeQuery":[],
			"filterPostsTemplate":[],
			"previousSidebarPosition":"",
			"disableInactiveTerms":false,
			"initSidebar":false,
			"initPostTheme":false,
			"initFieldsDraggable":false,
			"isAdministrator":('undefined' !== typeof capfData.settings.is_administrator ? parseInt( capfData.settings.is_administrator ) : 0 )
		};
		
		$scope.lscfSidebar = {};

		$scope.loadMoreBtn = {
			"morePostsAvailable": false,
			"noResults": false,
			"loading": false,
			"postsLoading": true,
			"sidebarLoading":true,
			"ready":true,
			"type":"default"
		};

		$scope.pluginSettings = {
			"className":{
				"sidebar":"",
				"posts_theme":""
			},
			"existsPosts": true,
			"pluginPath":capfData.plugin_url,
			"filterSettings":capfData.settings,
			"generalSettings":capfData.options,
			"editShortcodeLink":capfData.site_url + '/wp-admin/admin.php?page=pxLF_plugin&plugin-tab=filter-generator&edit_filter=' + capfData.ID
		};


		
		$scope.trust_as_html = function( html_code ) {

			return $sce.trustAsHtml( html_code );
		};	

		$scope.standartize_shortcodes_container_height = function(){

			var $j = jQuery,
				called = false,
				maxHeight = $scope.actionSettings.style.postMaxHeight;

				if ( $j( '.lscf-standartize-shorcodes-container-height' ).length > 0 ) {
					called = true;
		
					$j( '.lscf-standartize-shorcodes-container-height' ).each(function(){
						var elHeight = $j( this ).height();
						if ( maxHeight < elHeight ) { maxHeight = elHeight; }
					});
					$j('.lscf-standartize-shorcodes-container-height').attr({
						'style': 'height:' + maxHeight + 'px'
					});
		
					$scope.actionSettings.style.postMaxHeight = maxHeight;

					return;
			}

			setTimeout( function(){
				$scope.standartize_shortcodes_container_height();
			}, 300);

		};

		function lscf_infinite_scrolling() {

			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
				body = document.body,
				html = document.documentElement,
				documentHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ),
				windowHeight = window.innerHeight;

			if ( ( scrollTop + windowHeight ) + 250 >= documentHeight  && false === $scope.loadMoreBtn.loading ) {
				$scope.load_more();
				documentHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
			}
		}
		
		if ( 1 === $scope.pluginSettings.generalSettings.infinite_scrolling ) {
			window.addEventListener( 'scroll', lscf_infinite_scrolling );
			
		} else {
			window.removeEventListener( 'scroll', lscf_infinite_scrolling );
		}

		$scope.makeWrapperClassName = function( ) {

			var dataClass = {
				"sidebar":"",
				"posts_theme":""
				
			};

			if ( 'top' == $scope.pluginSettings.filterSettings.theme.sidebar.position ||  '0' == $scope.pluginSettings.filterSettings.theme.sidebar.position ) {

				dataClass.sidebar = 'col-sm-12 col-md-12 col-lg-12 lscf-horizontal-sidebar ';
				dataClass.posts_theme = 'col-sm-12 col-md-12 col-lg-12 lscf-wide-posts ';	

			} else {
				
				dataClass.sidebar =  ( capfData.settings.theme.columns > 3 ? 'col-sm-2 col-md-2 col-lg-2 ' : 'col-sm-3 col-md-3 col-lg-3 ' );
				dataClass.posts_theme = ( capfData.settings.theme.columns > 3 ? 'col-sm-10 col-md-10 col-lg-10 ' : 'col-sm-9 col-md-9 col-lg-9 ' );

			}

			return dataClass;

		};

		$scope.$watch('actionSettings.postsPerPage', function( newVal, oldVal ){

			if ( newVal != oldVal ) {
				
				customFilterService.getPosts( postType, $scope.actionSettings.postsPerPage, page, $scope.actionSettings.activeQuery )
					.success(function (data) {

						$scope.actionSettings.postsCount = data.postsCount;
						$scope.actionSettings.pagesCount = data.pages;
						$scope.actionSettings.pxCurrentPage = page + 1;

						if ($scope.actionSettings.pxCurrentPage > data.pages) $scope.loadMoreBtn.morePostsAvailable = false;
						$scope.loadMoreBtn.loading = false;

						$scope.actionSettings.filterPostsTemplate = data.posts;

						$scope.filterPostsTemplate.posts = $scope.actionSettings.filterPostsTemplate;

						$scope.directiveInfo.afterPostsLoadCallback();

				});
			}
		});

		$scope.$watch('actionSettings.initFieldsDraggable', function( newVal, oldVal ){

			if ( true === newVal ){
				
				filterFieldsMethod.fieldsData = {
					"fields": filterFieldsTemplate.default_data.fields,
					"filterID": filterID
				};
				
				setTimeout(function(){
					
					filterFieldsMethod.draggable.initFilterFields();
					filterFieldsMethod.draggable.initOptionOrder();

				}, 300);

			}

			if ( false === newVal ) {
				filterFieldsMethod.draggable.unbindOrder();
				filterFieldsMethod.draggable.unbindOptionOrder();
			}

		});

		$scope.$watch('actionSettings.initPostTheme', function( newVal, oldVal ){

			if ( true === newVal ) {

				$scope.actionSettings.initPostTheme = false;
				
				$scope.directiveInfo.ready();
			}

		});

		wrapperGeneralClassNames = $scope.makeWrapperClassName( $scope.pluginSettings.filterSettings.theme.sidebar.position );

		$scope.pluginSettings.className.sidebar = wrapperGeneralClassNames.sidebar;
		$scope.pluginSettings.className.posts_theme = wrapperGeneralClassNames.posts_theme;

		$scope.load_more = function () {

			$scope.loadMoreBtn.loading = true;

			if ( false === $scope.loadMoreBtn.morePostsAvailable ) { return; }

			jQuery( '.lscf-standartize-shorcodes-container-height' ).removeClass('lscf-standartize-shorcodes-container-height');

			if ( 'range' == $scope.loadMoreBtn.type ) {

				var page = $scope.actionSettings.rangeCurrentPage,
				    posts_per_page = $scope.actionSettings.postsPerPage,
					offset = parseInt( page ) * parseInt( posts_per_page ),
					data_posts = [];
				
				for ( var i = offset; i < $scope.matched_posts.length; i++ ) {

					if ( 'undefined' !== typeof $scope.matched_posts[i] && i < ( offset + parseInt( posts_per_page ) ) ) {
						data_posts.push( $scope.matched_posts[i] );
					} else {

						break;
					}
					
				}

				if ( $scope.matched_posts.length <= ( offset + parseInt( posts_per_page ) ) ) {
					$scope.loadMoreBtn.morePostsAvailable = false;
				} else {
					$scope.loadMoreBtn.morePostsAvailable = true;
				}

				$scope.actionSettings.filterPostsTemplate = $scope.actionSettings.filterPostsTemplate.concat( data_posts );

				$scope.filterPostsTemplate.posts = $scope.actionSettings.filterPostsTemplate;

				$scope.directiveInfo.afterPostsLoadCallback();

				$scope.actionSettings.rangeCurrentPage += 1;

				$scope.loadMoreBtn.loading = false;

				return;
		}

			var loadMoreQ = $scope.actionSettings.customFields;

			if ( null !== defaultFilter && loadMoreQ.length === 0 ) {
				loadMoreQ = defaultFilter;
			}

			customFilterService.getPosts( postType, $scope.actionSettings.postsPerPage, $scope.actionSettings.pxCurrentPage, loadMoreQ )
				.success(function (data) {

					$scope.actionSettings.postsCount = data.postsCount;
					$scope.actionSettings.pagesCount = data.pages;
					$scope.actionSettings.pxCurrentPage += 1;

					if ($scope.actionSettings.pxCurrentPage > data.pages) $scope.loadMoreBtn.morePostsAvailable = false;
					$scope.loadMoreBtn.loading = false;

					$scope.actionSettings.filterPostsTemplate = $scope.actionSettings.filterPostsTemplate.concat( data.posts );

					$scope.filterPostsTemplate.posts = $scope.actionSettings.filterPostsTemplate;

					$scope.directiveInfo.afterPostsLoadCallback();

				});

		};


		customFilterService.getSidebar()
			.success(function(data){
				$scope.lscfSidebar.html = data;
			});
			
			customFilterService.getFilterFields(filterID)
				.success(function (data) {

				$scope.loadMoreBtn.sidebarLoading = false;
				
				filterType = data.filter_type;

				if ( 'undefined' !== typeof ( data.default_data.custom_templates ) ) {
					$scope.pluginSettings.custom_templates = data.default_data.custom_templates;
				}


				if ( 'undefined' !== typeof data.default_data.settings.theme.posts_display_from && 
					'undefined' !== data.default_data.settings.theme.posts_display_from.post_taxonomies.active_terms && 
					 data.default_data.settings.theme.posts_display_from.post_taxonomies.active_terms.length > 0 )  
				{

					var default_filter = {"default_filter":{}};
					if ( 'undefined' !== typeof data.fields ) {
						default_filter.default_filter.fields = data.fields;
					}

					default_filter.default_filter.post_taxonomies = data.default_data.settings.theme.posts_display_from.post_taxonomies;

					defaultFilter = default_filter;

					customFilterService.getPosts( postType, $scope.actionSettings.postsPerPage, page, default_filter)
						.success(function (data) {

							$scope.actionSettings.activeTerms = data.active_terms;
							$scope.actionSettings.postsHasLoaded = true;
							$scope.loadMoreBtn.postsLoading = false;
							$scope.filterPostsTemplate.filter_type = data.filter_type;

							if ( data.postsCount < 1 ) { $scope.pluginSettings.existsPosts = false; }
							
							if ( data.posts.length > 0 ) $scope.loadMoreBtn.noResults = false;
							else $scope.loadMoreBtn.noResults = true;

							if ( data.featuredLabel === 1 ) $scope.featuredLabel = true;

							$scope.actionSettings.postsCount = data.postsCount;
							$scope.actionSettings.pagesCount = data.pages;
							$scope.actionSettings.pxCurrentPage = page + 1;
							$scope.allPostsCount = data.postsCount;


							if ( $scope.actionSettings.pxCurrentPage <= data.pages ) $scope.loadMoreBtn.morePostsAvailable = true;
							
							defaultLoadMoreBtnStatus = $scope.loadMoreBtn.morePostsAvailable;

							$scope.actionSettings.filterPostsTemplate = data.posts;
							dataPostsDefault = data.posts;
							
							$scope.filterPostsTemplate.posts = $scope.actionSettings.filterPostsTemplate;

							$scope.directiveInfo.ready();

							$scope.directiveInfo.afterPostsLoadCallback();

							$scope.loadMoreBtn.postsLoading = false;
						});

				} else {

					customFilterService.getPosts(postType, $scope.actionSettings.postsPerPage, page, null)
						.success(function (data) {

							$scope.actionSettings.activeTerms = data.active_terms;
							$scope.filterPostsTemplate.filter_type = data.filter_type;
							$scope.loadMoreBtn.postsLoading = false;

							if ( data.postsCount < 1 ) { $scope.pluginSettings.existsPosts = false; }
							
							if (data.posts.length > 0) $scope.loadMoreBtn.noResults = false;
							else $scope.loadMoreBtn.noResults = true;

							if (data.featuredLabel === 1) $scope.featuredLabel = true;

							$scope.actionSettings.postsCount = data.postsCount;
							$scope.actionSettings.pagesCount = data.pages;
							$scope.actionSettings.pxCurrentPage = page + 1;
							$scope.allPostsCount = data.postsCount;


							if ( $scope.actionSettings.pxCurrentPage <= data.pages ) $scope.loadMoreBtn.morePostsAvailable = true;
							
							defaultLoadMoreBtnStatus = $scope.loadMoreBtn.morePostsAvailable;

							$scope.actionSettings.filterPostsTemplate = data.posts;
							dataPostsDefault = data.posts;
							
							$scope.filterPostsTemplate.posts = $scope.actionSettings.filterPostsTemplate;

							$scope.directiveInfo.ready();

							$scope.directiveInfo.afterPostsLoadCallback();

							$scope.loadMoreBtn.postsLoading = false;

							
						});
				}

				var dataToFilter = [];

				if ( null !== defaultFilter ) {

					for ( var i = 0; i < defaultFilter.default_filter.post_taxonomies.active_terms.length; i++ ) {

						var matches = defaultFilter.default_filter.post_taxonomies.active_terms[i].match( /^([0-9]+)-(.*)/ ),
							catID = parseInt( matches[1] ),
							taxID = matches[2];

						for ( var k = 0; k < data.fields.length; k++ ) {

							if ( 'taxonomies' == data.fields[ k ].group_type &&
								'undefined' !== typeof data.fields[ k ].tax  && 
								data.fields[ k ].tax.slug == taxID ) 
							{

								data.fields[ k ].tax.activeTermsLength = defaultFilter.default_filter.post_taxonomies.active_terms.length;

								for ( var t = 0; t < data.fields[ k ].tax.terms.length; t++ ) {
									
									var term = data.fields[ k ].tax.terms[ t ];
									
									if ( catID == term.data.value ) {
										data.fields[ k ].tax.terms[ t ].checked = true;
									} 
								}

							}

						}

					}
				}

				filterFieldsTemplate = data;
				
				$scope.filterFieldsTemplate = filterFieldsTemplate;
				
				$scope.actionSettings.initSidebar = true;
				$scope.$watch('actionSettings.initSidebar', function( newVal, oldVal ){

					sidebarSection = $scope.pluginSettings.filterSettings.theme.sidebar.position == 'left' || $scope.pluginSettings.filterSettings.theme.sidebar.position == 'top' ? 1 :2;

					if ( $scope.actionSettings.previousSidebarPosition == 'left' || $scope.actionSettings.previousSidebarPosition == 'top' ) {
						
						previousSidebarSection = 1;

					} else if(  '' !== $scope.actionSettings.previousSidebarPosition ) {
						
						previousSidebarSection = 2;

					}

					if ( true === newVal ) {
						
						$scope.actionSettings.initSidebar = false;
						$scope.actionSettings.previousSidebarPosition = $scope.pluginSettings.filterSettings.theme.sidebar.position;

						if ( sidebarSection === previousSidebarSection ) {
							return;
						}

						customSelectBoxes.construct();

						// callback; 
						//it's called on field action
						filterFieldsAction.construct(function ( dataValue ) {

							// reset page
							page = 1;
							dataToFilter = $scope.actionSettings.customFields;

							var dataAction = "add";
							
							$scope.loadMoreBtn.postsLoading = true;

							if ( dataValue.constructor !== Array ) {
								var dataArray = [];
								dataArray[0] = dataValue;
								dataValue = dataArray;
							} 

							$j('.lscf-live-search-input').val('');

							dataValue.forEach(function( data ){
								//reset the action key
								dataAction = "add";

								switch (data.type) {

									case "date-interval":

										if (data.fields.from === '' || data.fields.to === '') {

											return;
										}

										break;

									case "checkbox_post_terms":

										if ( data.value.length === 0 ) { 

											dataToFilter = removeObjectKey(dataToFilter, data.ID);

											if ( 'cf_variation' == data.group_type ) {
												if ( 'undefined' === typeof $scope.variations[ data.ID ] ) {
													$scope.variations[ data.variation_id ] = {};
												}

												$scope.variations[ data.variation_id ].active = 'default';
											}
											dataAction = 'remove';
										}

										
										break;

									case "px_icon_check_box":
									case "checkbox":

										if ( data.value.length === 0 ) {

											dataToFilter = removeObjectKey(dataToFilter, data.ID);

											if ( 'checkbox_post_terms' == data.filter_as ) {
											
												for ( var k_cb in dataToFilter ) {
												
													if ( 'default_filter' == dataToFilter[ k_cb ].type ) {
														dataToFilter[ k_cb ].default_filter.post_taxonomies = lscf_reset_default_filter( dataToFilter[ k_cb ].default_filter.post_taxonomies, data );
														break;
													}
												}

											}

											if ( 'cf_variation' == data.group_type ) {
												if ( 'undefined' === typeof $scope.variations[ data.ID ] ) {
													$scope.variations[ data.variation_id ] = {};
												}

												$scope.variations[ data.variation_id ].active = 'default';
											}

											dataAction = 'remove';

										}

										break;


									case "select":

										if ( data.value.constructor === Array ) {
											sVal = data.value[0];
										} else {
											sVal = data.value;
										}

										if (sVal.toLowerCase() == 'select' || sVal == '0') {

											dataToFilter = removeObjectKey(dataToFilter, data.ID);
											dataToFilter = removeObjectLikeKey( dataToFilter, data.ID );


											if ( 'cf_variation' == data.group_type ) {
												if ( 'undefined' === typeof $scope.variations[ data.ID ] ) {
													$scope.variations[ data.variation_id ] = {};
												}

												$scope.variations[ data.variation_id ].active = 'default';
											}

											dataAction = 'remove';

											if ( 'checkbox_post_terms' == data.filter_as ) {
												for ( var k_s in dataToFilter ) {
													
													if ( 'default_filter' == dataToFilter[ k_s ].type ) {
														dataToFilter[ k_s ].default_filter.post_taxonomies = lscf_reset_default_filter( dataToFilter[ k_s ].default_filter.post_taxonomies, data );
														break;
													}
												}
											}

										} else if( 'checkbox_post_terms' == data.filter_as ) {

											dataToFilter = lscf_data_to_filter_subcategories( dataToFilter, data, filterFieldsTemplate );

										}

										break;

									case "radio":
										
										if ( data.value.constructor === Array ) {

											sVal = data.value[0];

										} else {

											sVal = data.value;
										}


										if ( sVal == '0' ) {
											
											dataToFilter = removeObjectKey(dataToFilter, data.ID);

											dataAction = 'remove';

											if ( 'cf_variation' == data.group_type ) {
												if ( 'undefined' === typeof $scope.variations[ data.ID ] ) {
													$scope.variations[ data.variation_id ] = {};
												}

												$scope.variations[ data.variation_id ].active = 'default';
											}

											if ( 'checkbox_post_terms' == data.filter_as ) {
												for ( var k_r in dataToFilter ) {
												
													if ( 'default_filter' == dataToFilter[ k_r ].type ) {
														dataToFilter[ k_r ].default_filter.post_taxonomies = lscf_reset_default_filter( dataToFilter[ k_r ].default_filter.post_taxonomies, data );
														break;
													}
												}
											}

										} else if( 'checkbox_post_terms' == data.filter_as ) {

											dataToFilter = lscf_data_to_filter_subcategories( dataToFilter, data, filterFieldsTemplate );

										}

										break;

									case "date":

										if (data.value === '') {

											dataToFilter = removeObjectKey(dataToFilter, data.ID);
											dataAction = 'remove';
										}

										break;
								}

								if ( dataAction == 'add' ) {

									if ( 'cf_variation' == data.group_type ) {

										if ( 'undefined' === typeof $scope.variations[ data.ID ] ) {
											$scope.variations[ data.variation_id ] = {};
										}
										var variation_option = ( data.value.constructor == Array ? data.value[0] : data.value );
										$scope.variations[ data.variation_id ].active = lscf_sanitize_string( variation_option );
										
									}

									var fdFieldExists = false;
									
									for ( var k in dataToFilter ) {
										if ( dataToFilter[ k ].ID == data.ID ) {
											dataToFilter[ k ] = data;
											fdFieldExists = true;
											break;
										}
									}

									if ( false === fdFieldExists ) {
										dataToFilter[ data.ID ] = data;
									}

									if ( 'checkbox_post_terms' == data.filter_as ) {
										for ( var k_rr in dataToFilter ) {

											if ( 'default_filter' == dataToFilter[ k_rr ].type ) {
												dataToFilter[ k_rr ].default_filter.post_taxonomies = lscf_reset_default_filter( dataToFilter[ k_rr ].default_filter.post_taxonomies, data );
												break;
											}
										}
									}

									$scope.loadMoreBtn.type = 'default';	
								}

							});


							var q = [];

							var taxonomiesActiveIds = [],
								activeParentIDs,
								taxListIDs = [];


							for ( var key in dataToFilter ) {
								
								var item = dataToFilter[ key ];
								
								if ( 'undefined' !== typeof item.ID ) {

									q.push( item );

									if ( 'undefined' !== typeof item.filter_as && 'checkbox_post_terms' == item.filter_as ) {

										var tax_slug = lscf_return_tax_main_slug( item.ID ),
											catValue;

										if ( 'undefined' === typeof taxonomiesActiveIds[ tax_slug ] ) {
											taxonomiesActiveIds[ tax_slug ] = [];
											taxListIDs.push( item.ID );
										}

										if ( Array === item.value.constructor ) {
											
											for ( var i = 0; i < item.value.length; i++ ) {

												if ( 'undefined' !== typeof  data.post_taxonomies[ tax_slug ] &&
														'undefined' !== typeof  data.post_taxonomies[ tax_slug ].tax.subcategs_hierarchy && 
														'undefined' !== typeof  data.post_taxonomies[ tax_slug ].tax.subcategs_hierarchy[ item.value[ i ] ] ) 
												{
														
													activeParentIDs = data.post_taxonomies[ tax_slug ].tax.subcategs_hierarchy[ item.value[ i ] ];

													for ( n = 0; n < activeParentIDs.length; n++ ) {
														
														catValue = parseInt( activeParentIDs[ n ] );

														taxonomiesActiveIds[ tax_slug ][ catValue ] = catValue;
													}

												}
												catValue = parseInt( item.value[ i ] );

												taxonomiesActiveIds[ tax_slug ][ catValue ] = catValue;
											}

										} else {
											
											catValue = parseInt( item.value );

											taxonomiesActiveIds[ tax_slug ][ catValue ] = catValue;

											if ( 'undefined' !== typeof  data.post_taxonomies[ tax_slug ] &&
												'undefined' !== typeof  data.post_taxonomies[ tax_slug ].tax.subcategs_hierarchy &&
												'undefined' !== typeof  data.post_taxonomies[ tax_slug ].tax.subcategs_hierarchy[ item.value ] ) 
											{
												
												activeParentIDs = data.post_taxonomies[ tax_slug ].tax.subcategs_hierarchy[ item.value ];

												for ( n =0; n < activeParentIDs.length; n++ ) {
													
													catValue = parseInt( activeParentIDs[ n ] );
													taxonomiesActiveIds[ tax_slug ][ catValue ] = catValue;
												}

											}

										}
										
									}
									
								}
							}

							taxonomiesActiveIds = lscf_reset_object_index( taxonomiesActiveIds );

							lscf_display_tax_subcategs( taxonomiesActiveIds );	

							if ( null !== defaultFilter && 
								'undefined' !== typeof defaultFilter.default_filter.post_taxonomies && 
								'undefined' !== typeof defaultFilter.default_filter.post_taxonomies.active_terms &&
								defaultFilter.default_filter.post_taxonomies.active_terms.length > 0 ) 
							{
								var defaultQuery = {};

								for ( ki = 0; ki < defaultFilter.default_filter.post_taxonomies.active_terms.length; ki++ ) {

									var dqActiveTerm = defaultFilter.default_filter.post_taxonomies.active_terms[ ki ];

									if ( dqActiveTerm.match( /([0-9]+)-(.+?)$/ ) ) {

										var matches = dqActiveTerm.match( /([0-9]+)-(.+?)$/ );

										var qdTermID = matches[1],
											qdTaxSlug = matches[2];

										if ( -1 == taxListIDs.indexOf( qdTaxSlug ) ) {
											
											if ( 'undefined' === typeof defaultQuery[ qdTaxSlug ] ) {

												defaultQuery[ qdTaxSlug ] = {
													"ID":qdTaxSlug,
													"filter_as":"checkbox_post_terms",
													"group_type":"taxonomies",
													"type":"checkbox_post_terms",
													"value":[ qdTermID ],
													"variation_id":null
												};

											} else {

												defaultQuery[ qdTaxSlug ].value.push( qdTermID );
											}
										}
									}
								}

								for ( var taxSlug in defaultQuery ) {
									q.push( defaultQuery[ taxSlug ] );
								}
							}

							$scope.actionSettings.activeQuery = q;
							$scope.actionSettings.customFields = q;

							customFilterService.getPosts(postType, $scope.actionSettings.postsPerPage, page, q)
								.success(function (data) {

									$scope.actionSettings.lsLoadPosts = true;

									if ( data.active_terms.length > 0 ) {
										
										$scope.actionSettings.disableInactiveTerms = true;

										var filterFieldsData = $scope.filterFieldsTemplate.fields;

										for ( var i = 0; i < filterFieldsData.length; i++ ) {

											if ( 'taxonomies' == filterFieldsData[ i ].group_type ) {

												for ( var t = 0; t < filterFieldsData[ i ].tax.terms.length; t++ ) {

													var term_id = filterFieldsData[ i ].tax.terms[ t ].data.value;

													if ( 'undefined' === typeof data.active_terms[ term_id ] ) {
														filterFieldsData[ i ].tax.terms[ t ].data.not_active = true;
													} else {
														filterFieldsData[ i ].tax.terms[ t ].data.not_active = false;
													}
												}

											} else if ( 'custom_field' == filterFieldsData[ i ].group_type ) {

												if ( 'undefined' !== typeof data.active_terms.custom_fields && 'undefined' !== typeof filterFieldsData[ i ].options ) {

													for ( var k = 0; k < filterFieldsData[ i ].options.length; k++ ) {

														var slug = filterFieldsData[ i ].ID + lscf_sanitize_string( filterFieldsData[ i ].options[ k ].opt );

														if ( 'undefined' === typeof data.active_terms.custom_fields[ slug ] ) {
															filterFieldsData[ i ].options[ k ].not_active = true;
														} else {
															filterFieldsData[ i ].options[ k ].not_active = false;
														}

													}

												}

											}

										}


										$scope.filterFieldsTemplate.fields = filterFieldsData;


										setTimeout(function(){
											lscf_custom_dropdowns_update_options_classnames();
										}, 500);
										

									} else {
										$scope.actionSettings.disableInactiveTerms = false;
										setTimeout(function(){
											lscf_custom_dropdowns_update_options_classnames();
										}, 500);
									}


									if (data.posts.length > 0) $scope.loadMoreBtn.noResults = false;
									else $scope.loadMoreBtn.noResults = true;

									$scope.actionSettings.activeTerms = data.active_terms;
									$scope.actionSettings.postsCount = data.postsCount;
									$scope.actionSettings.pagesCount = data.pages;
									$scope.actionSettings.pxCurrentPage = page + 1;
									$scope.actionSettings.customFields = q;

									if ( $scope.actionSettings.pxCurrentPage <= data.pages ) $scope.loadMoreBtn.morePostsAvailable = true;
									else $scope.loadMoreBtn.morePostsAvailable = false;

									$scope.actionSettings.filterPostsTemplate = data.posts;
									$scope.filterPostsTemplate.posts = data.posts;
									$scope.loadMoreBtn.postsLoading = false;

									$scope.directiveInfo.afterPostsLoadCallback();
									
								});

								$scope.reset_filter = function(){

									filterFieldsAction.reset_fields();

									$scope.filterPostsTemplate.posts = dataPostsDefault;
									$scope.actionSettings.filterPostsTemplate = dataPostsDefault;
									$scope.loadMoreBtn.morePostsAvailable = defaultLoadMoreBtnStatus;
									dataToFilter = null;
									dataToFilter = [];
									$scope.actionSettings.customFields = null;
									$scope.actionSettings.customFields = [];
									$scope.actionSettings.pxCurrentPage = 2;
									$scope.loadMoreBtn.noResults = false;

									$scope.directiveInfo.afterPostsLoadCallback();

								};

						});

					}
				});

				rangeField.construct(function (data) {
					// reset page
					page = 1;


					dataToFilter[data.ID] = data;

					if ( 'px-woocommerce-price' !== data.ID && 'px-woocommerce-inventory' !== data.ID ) {
						$scope.loadMoreBtn.type = 'range';
					}

					var q = [];

					for (var prop in dataToFilter) {

						if ( 'undefined' !== typeof dataToFilter[prop].ID ) {
							q.push(dataToFilter[prop]);
						}

					}

					$scope.loadMoreBtn.postsLoading = true;
					$scope.actionSettings.rangeCurrentPage = 2;

					customFilterService.getPosts(postType, $scope.actionSettings.postsPerPage, page, q)
						.success(function (data) {

							if (data.posts.length > 0) $scope.loadMoreBtn.noResults = false;
							else $scope.loadMoreBtn.noResults = true;
							

							$scope.actionSettings.activeTerms = data.active_terms;
							$scope.matched_posts = data.matched_posts;

							$scope.actionSettings.postsCount = data.postsCount;
							$scope.actionSettings.pagesCount = data.pages;
							$scope.actionSettings.pxCurrentPage = page + 1;
							$scope.actionSettings.customFields = q;

							if ( $scope.actionSettings.pxCurrentPage <= data.pages ) $scope.loadMoreBtn.morePostsAvailable = true;
							else $scope.loadMoreBtn.morePostsAvailable = false;	

							$scope.actionSettings.filterPostsTemplate = data.posts;
							$scope.filterPostsTemplate.posts = data.posts;

							$scope.directiveInfo.afterPostsLoadCallback();

							$scope.loadMoreBtn.postsLoading = false;

						});

				});

			});

	});


function lscf_data_to_filter_subcategories( dataToFilter, data, fieldsData ){

	var tax_slug = lscf_return_tax_main_slug( data.ID ),
		catID,
		parentIDs,
		parentID;

	dataToFilter = removeObjectKey(dataToFilter, data.ID);
									
	tax_slug = lscf_return_tax_main_slug( data.ID );
	catID = parseInt( data.value );

	dataToFilter = removeObjectLikeKey( dataToFilter, tax_slug );
	
	if ( 'undefined' !== typeof fieldsData.post_taxonomies[ tax_slug ] ) {

		if ( 'undefined' !== typeof fieldsData.post_taxonomies[ tax_slug ].tax.subcategs_hierarchy && 'undefined' !== typeof fieldsData.post_taxonomies[ tax_slug ].tax.subcategs_hierarchy[ catID ] ) {
		
			parentIDs = fieldsData.post_taxonomies[ tax_slug ].tax.subcategs_hierarchy[ catID ];

			for ( var i = 0; i < parentIDs.length; i++ ) {
				
				if ( 'undefined' !== typeof fieldsData.post_taxonomies[ tax_slug ].tax.subcategs_hierarchy[ parentIDs[ i ] ] ) {
					
					parentID = tax_slug + '_-_' + parentIDs[ i ];
					
					dataToFilter[ parentID ] = {
						"ID":parentID,
						"type":data.type,
						"value":parentIDs[ i ],
						"filter_as":data.filter_as
					};

				}
				
			}

		}

	}

	return dataToFilter;
}

function removeObjectKey(objectData, key) {

    var temp = {};

    for ( var prop in objectData ) {

        if ( objectData[ prop ].ID != key ) {
            temp[ prop ] = objectData[ prop ];
        }

    }

    return temp;
}
function removeObjectLikeKey(objectData, key){
	
	var temp = {};
	for (var prop in objectData) {

		if ( -1 === prop.indexOf(key) ) {
			temp[prop] = objectData[prop];
		}

	}

	return temp;
}

function lscf_display_tax_subcategs( objTax ){
	
	var $j = jQuery;

	$j('.lscf-taxonomies-fields').each( function(){
		
		var tax_slug = $j( this ).find('.px_capf-field').attr('data-id');

		if ( 'undefined' === typeof objTax[ tax_slug ] ) {
			
			$j( this ).find('.subcategs-tax').hide();	

			return;
		}

		var activeParentIDs = objTax[ tax_slug ];

		$j( this ).find('.subcategs-tax').each(function () {
		
			var ID = parseInt( $j(this).attr('data-parent') );
			var subCateg = $j(this);
	
			if ( activeParentIDs.indexOf( ID ) != -1 ) {
				
				subCateg.fadeIn();		

			} else {
			
				subCateg.hide();
				subCateg.find('.styledSelect').text( capfData.options.writing.select );
				subCateg.find('.px_capf-field').removeClass('active-val');
				subCateg.find('input[type="radio"]').removeAttr( "checked" );

			}

		});
	});

}

function lscf_reset_default_filter( default_filter, termData ){
	
	var termID = termData.value,
		tax_slug = lscf_return_tax_main_slug( termData.ID );


	if ( 'undefined' !== typeof default_filter[ tax_slug ] ) {

		var tax = default_filter[ tax_slug ].tax,
			termsData = [];

		for ( var t in tax.terms ){

			if ( 0 === termID ) {
				
				delete default_filter[ tax_slug ];

			} else if ( 'undefined' !== typeof default_filter[ tax_slug ] && 'undefined' !== typeof default_filter[ tax_slug ].tax &&  tax.terms[ t ].data.value != termID ) {

				if ( tax.terms.length == 1 ) {

					delete default_filter[ tax_slug ];

				} else {

					delete default_filter[ tax_slug ].tax.terms[ t ];

					var terms_t = lscf_reset_object_index( default_filter[ tax_slug ].terms );
					default_filter[ tax_slug ].terms = terms_t;
					default_filter[ tax_slug ].terms.length = terms_t.length;

					if ( terms_t.length === 0 ) {
						delete default_filter[ tax_slug ];
					}

				 }	
			}
		}
	}
	
	return default_filter;

}

function lscf_return_tax_main_slug( string ){
	
	var tax_slug = string;

	if ( string.match( /(.+?)_-_([0-9]+)$/ ) ) {
								
		var matches = string.match( /(.+?)_-_([0-9]+)$/ );
		
		tax_slug = matches[1];
	}

	return tax_slug;
}

function lscf_reset_object_index( objData ) {
	
	var results = [];
	
	for ( var key in objData ) {
		
		if ( 'undefined' === typeof results[ key ] ) {
			results[ key ] = [];
		}
		for ( var i in objData[ key ] ) {
			results[ key ].push( objData[ key ] [ i ] );
		}
		
	}

	return results;
}

function lscf_custom_dropdowns_update_options_classnames(){
	
	var $j = jQuery;

	$j('.pxSelectField').each(function(){
		
		var _this = $j(this);

		$j(this).find('select option').each(function( index ){

			if ( 1 == $j(this).attr('ng-data-disabled') ) {
				
				_this.find('.lscf-dropdown-option').eq(index).addClass('lscf-option-disabled');	
			}
			else {
				_this.find('.lscf-dropdown-option').eq(index).removeClass('lscf-option-disabled');
			}
			
		});

	});

}

function lscf_sanitize_string( string ) {
	string = string.replace( /([\!\@\#\$\%\^\&\*\(\[\)\]\{\-\}\\\/\:\;\+\=\.\\<\,\>\?\~\`\'\" ]+)/g, '_');
	return string.toLowerCase();
}
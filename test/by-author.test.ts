import test from 'ava';
// @ts-ignore
import browserEnv from 'browser-env';

browserEnv();

import { parseByAuthorPage } from '../src/api/by-author';
import { Book } from '../src/types';

test('oneBook', async t => {
  const html = `<li class="bc-list-item productListItem" aria-label='Rhythm of War'> <div id="" class="bc-row-responsive" style=""> <div class="bc-col-responsive bc-spacing-top-none bc-col-8"> <div id="" class="bc-row-responsive" style=""> <div class="bc-col-responsive bc-col-5"> <div id="" class="bc-row-responsive" style=""> <div class="bc-col-responsive bc-col-12"> <div data-trigger="product-list-flyout-1473231051" class="bc-trigger bc-pub-block bc-trigger-popover"> <a class="bc-link bc-color-link" tabindex="0" aria-hidden='false' aria-describedby='product-list-flyout-1473231051' href="/pd/Rhythm-of-War-Audiobook/1473231051?qid=1599557834&sr=1-21&ref=a_search_c3_lProduct_2_1&pf_rd_p=e81b7c27-6880-467a-b5a7-13cef5d729fe&pf_rd_r=Z74C5BV3XJPXBRG99VNH"> <div class="adbl-asin-impression-disabled " data-asin="1473231051" data-widget="" data-position="1" data-face-out="" data-source="" data-url="/pd/Rhythm-of-War-Audiobook/1473231051?qid=1599557834&sr=1-21&ref=a_search_c3_lProduct_2_1&pf_rd_p=e81b7c27-6880-467a-b5a7-13cef5d729fe&pf_rd_r=Z74C5BV3XJPXBRG99VNH"> <noscript> <img id="nojs_img_" class="bc-pub-block bc-image-inset-border" loading="lazy" src="https://m.media-amazon.com/images/I/51IY+RaNxRL._SL500_.jpg" data-bc-hiRes="https://m.media-amazon.com/images/I/51IY+RaNxRL._SL500_.jpg" alt="Rhythm of War audiobook cover art" width="100%"/> </noscript> <img id="" class="bc-pub-block bc-image-inset-border js-only-element" src="https://m.media-amazon.com/images/I/51IY+RaNxRL._SL500_.jpg" onerror="this.src='https://m.media-amazon.com/images/I/51IY+RaNxRL._SL5_.jpg'; this.onerror=null;" data-bc-hiRes="https://m.media-amazon.com/images/I/51IY+RaNxRL._SL500_.jpg" alt="Rhythm of War audiobook cover art" width="100%"/> </div> </a> </div> <div id="product-list-flyout-1473231051" class="bc-popover bc-hidden bc-palette-default" role="tooltip" aria-label="popover" data-popover-position="right" data-width=320 data-hoverable="false" data-bodyLevel="true"> <span class="bc-popover-beak"></span> <div class="bc-popover-inner" style=""> <span> <ul class="bc-list bc-pub-overflow-hidden bc-spacing-small bc-size-small bc-color-secondary bc-list-nostyle"> <li class="bc-list-item"> <h2 class="bc-heading bc-color-base bc-text-bold">Rhythm of War</h2> </li> <li class="bc-list-item bc-spacing-micro bc-size-base bc-color-base"> The Stormlight Archive, Book 4 </li> <li class="bc-list-item"> By: Brandon Sanderson </li> <li class="bc-list-item"> Length: 40 hrs </li> <li class="bc-list-item"> Unabridged </li> </ul> </span> <span> <ul class="bc-list bc-spacing-small bc-size-mini bc-color-secondary bc-list-nostyle"> <li class="bc-list-item bc-spacing-micro"> <div id="" class="bc-row-responsive" style=""> <div class="bc-col-responsive bc-col-4"> Overall </div> <div class="bc-col-responsive bc-col-8"> <div class="bc-review-stars"> <i aria-hidden="true" class="bc-icon bc-icon-star bc-icon-size-small bc-color-tertiary"> </i> <i aria-hidden="true" class="bc-icon bc-icon-star bc-icon-size-small bc-color-tertiary"> </i> <i aria-hidden="true" class="bc-icon bc-icon-star bc-icon-size-small bc-color-tertiary"> </i> <i aria-hidden="true" class="bc-icon bc-icon-star bc-icon-size-small bc-color-tertiary"> </i> <i aria-hidden="true" class="bc-icon bc-icon-star bc-icon-size-small bc-color-tertiary"> </i> </div> <span class="bc-text bc-pub-offscreen">0 out of 5 stars</span> <span class="bc-letter-space bc-letter-space-mini"></span> 0 </div> </div> </li> <li class="bc-list-item bc-spacing-micro"> <div id="" class="bc-row-responsive" style=""> <div class="bc-col-responsive bc-col-4"> Performance </div> <div class="bc-col-responsive bc-col-8"> <div class="bc-review-stars"> <i aria-hidden="true" class="bc-icon bc-icon-star bc-icon-size-small bc-color-tertiary"> </i> <i aria-hidden="true" class="bc-icon bc-icon-star bc-icon-size-small bc-color-tertiary"> </i> <i aria-hidden="true" class="bc-icon bc-icon-star bc-icon-size-small bc-color-tertiary"> </i> <i aria-hidden="true" class="bc-icon bc-icon-star bc-icon-size-small bc-color-tertiary"> </i> <i aria-hidden="true" class="bc-icon bc-icon-star bc-icon-size-small bc-color-tertiary"> </i> </div> <span class="bc-text bc-pub-offscreen">0 out of 5 stars</span> <span class="bc-letter-space bc-letter-space-mini"></span> 0 </div> </div> </li> <li class="bc-list-item"> <div id="" class="bc-row-responsive" style=""> <div class="bc-col-responsive bc-col-4"> Story </div> <div class="bc-col-responsive bc-col-8"> <div class="bc-review-stars"> <i aria-hidden="true" class="bc-icon bc-icon-star bc-icon-size-small bc-color-tertiary"> </i> <i aria-hidden="true" class="bc-icon bc-icon-star bc-icon-size-small bc-color-tertiary"> </i> <i aria-hidden="true" class="bc-icon bc-icon-star bc-icon-size-small bc-color-tertiary"> </i> <i aria-hidden="true" class="bc-icon bc-icon-star bc-icon-size-small bc-color-tertiary"> </i> <i aria-hidden="true" class="bc-icon bc-icon-star bc-icon-size-small bc-color-tertiary"> </i> </div> <span class="bc-text bc-pub-offscreen">0 out of 5 stars</span> <span class="bc-letter-space bc-letter-space-mini"></span> 0 </div> </div> </li> </ul> </span> <p class="bc-text bc-spacing-small bc-spacing-top-none bc-size-small bc-color-base"> <p>After forming a coalition of human resistance against the enemy invasion, Dalinar Kholin, and his Knights Radiant, have spent a year fighting a protracted, brutal war. Neither side has gained an advantage. Now, as new technological discoveries begin to change the face of the war, the enemy prepares a bold and dangerous operation. The arms race that follows will challenge the very core of the Radiant ideals, and potentially reveal the secrets of the ancient tower that was once the heart of their strength.</p> </p> </div> </div> </div> </div> </div> <div class="bc-col-responsive bc-col-6"> <div id="" class="bc-row-responsive" style=""> <div class="bc-col-responsive bc-col-12"> <span> <ul class="bc-list bc-list-nostyle"> <li class="bc-list-item"> <h3 class="bc-heading bc-color-link bc-pub-break-word bc-size-medium"> <a class="bc-link bc-color-link" tabindex="0" href="/pd/Rhythm-of-War-Audiobook/1473231051?qid=1599557834&sr=1-21&ref=a_search_c3_lProduct_2_1&pf_rd_p=e81b7c27-6880-467a-b5a7-13cef5d729fe&pf_rd_r=Z74C5BV3XJPXBRG99VNH">Rhythm of War</a> </h3> </li> <li class="bc-list-item subtitle"> <span class="bc-text bc-size-base bc-color-secondary">The Stormlight Archive, Book 4</span> </li> <li class="bc-list-item authorLabel"> <span class="bc-text bc-size-small bc-color-secondary"> By: <a class="bc-link bc-color-link" tabindex="0" href="/search?searchAuthor=Brandon+Sanderson&ref=a_search_c3_lAuthor_2_1_1&pf_rd_p=e81b7c27-6880-467a-b5a7-13cef5d729fe&pf_rd_r=Z74C5BV3XJPXBRG99VNH">Brandon Sanderson</a> </span> </li> <li class="bc-list-item seriesLabel"> <span class="bc-text bc-size-small bc-color-secondary"> Series: <a class="bc-link bc-color-link" tabindex="0" href="/series/Stormlight-Archive-Audiobooks/B006K1RP8I?ref=a_search_c3_lSeries_2_1_1&pf_rd_p=e81b7c27-6880-467a-b5a7-13cef5d729fe&pf_rd_r=Z74C5BV3XJPXBRG99VNH">Stormlight Archive</a>, Book 4 </span> </li> <li class="bc-list-item runtimeLabel"> <span class="bc-text bc-size-small bc-color-secondary">Length: 40 hrs</span> </li> <li class="bc-list-item releaseDateLabel"> <span class="bc-text bc-size-small bc-color-secondary">Release date: 11-17-20 </span> </li> <li class="bc-list-item languageLabel"> <span class="bc-text bc-size-small bc-color-secondary">Language: English </span> </li> <li class="bc-list-item ratingsLabel"> <span class="bc-text bc-size-small bc-color-secondary">Not rated yet</span> </li> </ul> </span> </div> </div> </div> </div> </div> <div class="bc-col-responsive bc-col-4"> <div id="adbl-buy-box-area" class="bc-section bc-spacing-none bc-spacing-top-none bc-padding-none bc-padding-top-none adblBuyBoxArea" style=""> <div id="adbl-callto-action-container" class="bc-section bc-spacing-none bc-spacing-top-none bc-padding-none bc-padding-top-none adblCalltoActionContainer" style=""> <div id="adbl-buy-box-container" class="bc-row-responsive adblBuyBoxContainer bc-spacing-top-small bc-spacing-none" style=""> <div id=adbl-buy-box class="bc-col-responsive adblBuyBox bc-spacing-none bc-spacing-top-none bc-col-12"> <div id="adbl-common-buybox-0" class="bc-box bc-box-padding-none adblCommonBuyBox bc-text-left"> <div id="adbl-buybox-area-0" class="bc-section bc-spacing-none bc-spacing-top-none" style=""> <div id="adbl-buy-box-ajax-error-0" class="bc-section bc-spacing-mini bc-padding-none bc-padding-top-none adblBuyBoxAjaxError bc-hidden" style=""> <div id="adbl-buy-box-cart-error-alert-0" class="bc-box bc-palette-default" role='alert'> <div class="bc-box-padding-small bc-color-secondary bc-inline-alert-error adblBuyBoxCartErrorAlert bc-hidden bc-color-background-base"> <div id="" class="bc-row-responsive bc-spacing-none" style=""> <div class="bc-col-responsive bc-text-right bc-col-1"> <i aria-hidden="true" class="bc-icon bc-icon-exclamation-triangle bc-icon-size-small bc-color-error"> </i> </div> <div class="bc-col-responsive bc-col-11"> <div class="bc-section" style=""> <h2 class="bc-heading bc-color-error bc-size-base bc-text-bold"> Add to Cart failed. </h2> </div> <div class="bc-section bc-spacing-top-micro" style=""> <span class="bc-text bc-color-base"> <span class="bc-text">Please try again later</span> </span> </div> </div> </div> </div> </div> <div id="adbl-buy-box-add-to-wishlist-error-alert-0" class="bc-box bc-palette-default" role='alert'> <div class="bc-box-padding-small bc-color-secondary bc-inline-alert-error adblBuyBoxAddToWishlistErrorAlert bc-hidden bc-color-background-base"> <div id="" class="bc-row-responsive bc-spacing-none" style=""> <div class="bc-col-responsive bc-text-right bc-col-1"> <i aria-hidden="true" class="bc-icon bc-icon-exclamation-triangle bc-icon-size-small bc-color-error"> </i> </div> <div class="bc-col-responsive bc-col-11"> <div class="bc-section" style=""> <h2 class="bc-heading bc-color-error bc-size-base bc-text-bold"> Add to Wish List failed. </h2> </div> <div class="bc-section bc-spacing-top-micro" style=""> <span class="bc-text bc-color-base"> <span class="bc-text">Please try again later</span> </span> </div> </div> </div> </div> </div> <div id="adbl-buy-box-remove-from-wishlist-error-alert-0" class="bc-box bc-palette-default" role='alert'> <div class="bc-box-padding-small bc-color-secondary bc-inline-alert-error adblBuyBoxRemoveFromWishlistErrorAlert bc-hidden bc-color-background-base"> <div id="" class="bc-row-responsive bc-spacing-none" style=""> <div class="bc-col-responsive bc-text-right bc-col-1"> <i aria-hidden="true" class="bc-icon bc-icon-exclamation-triangle bc-icon-size-small bc-color-error"> </i> </div> <div class="bc-col-responsive bc-col-11"> <div class="bc-section" style=""> <h2 class="bc-heading bc-color-error bc-size-base bc-text-bold"> Remove from wishlist failed. </h2> </div> <div class="bc-section bc-spacing-top-micro" style=""> <span class="bc-text bc-color-base"> <span class="bc-text">Please try again later</span> </span> </div> </div> </div> </div> </div> <div id="adbl-buy-box-romance-aycl-error-alert-0" class="bc-box bc-palette-default" role='alert'> <div class="bc-box-padding-small bc-color-secondary bc-inline-alert-error adblBuyBoxRomanceAYCLErrorAlert bc-hidden bc-color-background-base"> <div id="" class="bc-row-responsive bc-spacing-none" style=""> <div class="bc-col-responsive bc-text-right bc-col-1"> <i aria-hidden="true" class="bc-icon bc-icon-exclamation-triangle bc-icon-size-small bc-color-error"> </i> </div> <div class="bc-col-responsive bc-col-11"> <div class="bc-section" style=""> <h2 class="bc-heading bc-color-error bc-size-base bc-text-bold"> Adding to library failed </h2> </div> <div class="bc-section bc-spacing-top-micro" style=""> <span class="bc-text bc-color-base"> <span class="bc-text">Please try again</span> </span> </div> </div> </div> </div> </div> <div id="adbl-buy-box-discovery-aycl-error-alert-0" class="bc-box bc-palette-default" role='alert'> <div class="bc-box-padding-small bc-color-secondary bc-inline-alert-error adblBuyBoxAddToLibraryErrorAlert bc-hidden bc-color-background-base"> <div id="" class="bc-row-responsive bc-spacing-none" style=""> <div class="bc-col-responsive bc-text-right bc-col-1"> <i aria-hidden="true" class="bc-icon bc-icon-exclamation-triangle bc-icon-size-small bc-color-error"> </i> </div> <div class="bc-col-responsive bc-col-11"> <div class="bc-section" style=""> <h2 class="bc-heading bc-color-error bc-size-base bc-text-bold"> Adding to library failed </h2> </div> <div class="bc-section bc-spacing-top-micro" style=""> <span class="bc-text bc-color-base"> <span class="bc-text">Please try again</span> </span> </div> </div> </div> </div> </div> <div id="adbl-buy-box-follow-podcast-error-alert-0" class="bc-box bc-palette-default" role='alert'> <div class="bc-box-padding-small bc-color-secondary bc-inline-alert-error adblBuyBoxFollowPodcastErrorAlert bc-hidden bc-color-background-base"> <div id="" class="bc-row-responsive bc-spacing-none" style=""> <div class="bc-col-responsive bc-text-right bc-col-1"> <i aria-hidden="true" class="bc-icon bc-icon-exclamation-triangle bc-icon-size-small bc-color-error"> </i> </div> <div class="bc-col-responsive bc-col-11"> <div class="bc-section" style=""> <h2 class="bc-heading bc-color-error bc-size-base bc-text-bold"> Follow podcast failed </h2> </div> <div class="bc-section bc-spacing-top-micro" style=""> <span class="bc-text bc-color-base"> <span class="bc-text">Please try again</span> </span> </div> </div> </div> </div> </div> <div id="adbl-buy-box-unfollow-podcast-error-alert-0" class="bc-box bc-palette-default" role='alert'> <div class="bc-box-padding-small bc-color-secondary bc-inline-alert-error adblBuyBoxUnfollowPodcastErrorAlert bc-hidden bc-color-background-base"> <div id="" class="bc-row-responsive bc-spacing-none" style=""> <div class="bc-col-responsive bc-text-right bc-col-1"> <i aria-hidden="true" class="bc-icon bc-icon-exclamation-triangle bc-icon-size-small bc-color-error"> </i> </div> <div class="bc-col-responsive bc-col-11"> <div class="bc-section" style=""> <h2 class="bc-heading bc-color-error bc-size-base bc-text-bold"> Unfollow podcast failed </h2> </div> <div class="bc-section bc-spacing-top-micro" style=""> <span class="bc-text bc-color-base"> <span class="bc-text">Please try again</span> </span> </div> </div> </div> </div> </div> </div> <div id="" class="bc-row bc-spacing-top-none" style=""> <div id="adbl-buy-box-price-0" class="bc-section bc-spacing-none adblBuyBoxPrice" style=""> <p id="buybox-regular-price-0" class="bc-text buybox-regular-price bc-spacing-none bc-spacing-top-none"> <span class="bc-text bc-size-small bc-color-secondary">Regular price: </span> <span class="bc-text bc-size-small bc-color-secondary bc-text-strike"> $34.09 </span> </p> <p id="buybox-member-price-0" class="bc-text buybox-member-price bc-spacing-none bc-spacing-top-none"> <span class="bc-text bc-size-base bc-color-base">Member price: </span> <span class="bc-text bc-size-base bc-color-price">$23.86</span> <span class="bc-text adblBuyBoxCreditCost bc-color-base" id="adbl_buybox_credit_cost"> or 1 credit </span> </p> </div> <!-- include nested components --> </div> <div id="" class="bc-row bc-spacing-top-micro" style=""> <div id="adbl-add-to-cart-0" class="bc-row adblAddToCart bc-spacing-top-none bc-spacing-none" style=""> <input type="hidden" name="asin" value="1473231051"> <input type="hidden" name="ct" value="guvNEalJmu7ZSFip4HQu5UT1n2CbzX5YxsWXejQAAAABAAAAAF9XUMtyYXcAAAAAFVfwRGgNifE9xfqJS///"> <span id="adbl-add-to-cart-button-0" class="bc-button bc-button-preorder adblAddToCartButton  bc-button-small"> <button type="submit" class="bc-button-text" Pre-order tabindex="0"> <span class="bc-text bc-button-text-inner bc-size-action-small"> <span class="bc-text adblAddToCartText">Pre-order</span> <span class="bc-text adblAddingText bc-hidden">Adding...</span> </span> </button> </span> <span id="adbl-go-to-cart-button-0" class="bc-button bc-button-active adblGoToCartButton  bc-hidden  bc-button-small"> <a class="bc-button-text" title="Rhythm of War already added to cart. Go to cart" alt="Rhythm of War already added to cart. Go to cart" href="/cart/view?ref=a_search_c3_buy_for_cash_-0&pf_rd_p=e81b7c27-6880-467a-b5a7-13cef5d729fe&pf_rd_r=Z74C5BV3XJPXBRG99VNH" tabindex="0"> <span class="bc-text bc-button-text-inner bc-size-action-small"> <span class="bc-text adblInCart"> <i aria-hidden="true" class="bc-icon bc-icon-check"> </i>In cart </span> </span> </a> </span> </div> <!-- include nested components --> </div> <div id="" class="bc-row bc-spacing-top-micro" style=""> <div id="adbl-add-to-wishlist-0" class="bc-row wishlist bc-text-center" style=""> <input type="hidden" name="token" value="gllJB0ZSDT6NE2qEjVPNqZx2B1AHfpb+ng/3mfwAAAABAAAAAF9XUMtyYXcAAAAAFVfwRGgNifE9xfqJS///"> <input type="hidden" name="key" value="AudibleAction"> <input type="hidden" name="asin" value="1473231051"> <span id="adbl-add-to-wishlist-button-0" class="bc-button bc-button-secondary adblAddToWishlistButton  bc-button-small"> <button class="bc-button-text" title="Add Rhythm of War to your Wish List" alt="Add Rhythm of War to your Wish List" contentType="Audiobook" type="button" tabindex="0"> <span class="bc-text bc-button-text-inner bc-size-action-small"> <span class="bc-text adblAddToWishlistText">Add to Wish List</span> <span class="bc-text adblAddingToWishlistText bc-hidden">Adding...</span> </span> </button> </span> <span id="adbl-remove-from-wishlist-button-0" class="bc-button bc-button-secondary bc-hidden  bc-button-small"> <button class="bc-button-text" title="Remove Rhythm of War from Wish List" alt="Remove Rhythm of War from Wish List" type="button" tabindex="0"> <span class="bc-text bc-button-text-inner bc-size-action-small"> <span class="bc-text adblRemoveFromWishlistText">Remove from Wish List</span> <span class="bc-text adblRemovingFromWishlistText bc-hidden">Removing...</span> </span> </button> </span> <span id="adbl-go-to-wishlist-button-0" class="bc-button bc-button-active bc-hidden adblGoToWishlistButton bc-button-small"> <a class="bc-button-text" Rhythm of War is already added to Wish List. Go to Wish List href="/a/wishlist?ref=a_search_c3_view_wishlist_-0&pf_rd_p=e81b7c27-6880-467a-b5a7-13cef5d729fe&pf_rd_r=Z74C5BV3XJPXBRG99VNH" tabindex="0"> <span class="bc-text bc-button-text-inner bc-size-action-small"> <span class="bc-text adblInWishlistText"> <i aria-hidden="true" class="bc-icon bc-icon-check"> </i>  In Wish List</span> </span> </a> </span> </div> <!-- include nested components --> </div> </div> </div> </div> </div> </div> </div> </div> <div class="bc-col-responsive bc-spacing-base bc-spacing-top-base bc-col-12"> <div class="bc-divider bc-divider-secondary"> </div> </div> </div> </li>`;

  const res = await parseByAuthorPage(html);
  t.is(res.pageCount, 1);
  t.is(res.books.length, 1);
  t.deepEqual(res.books[0], {
    id: '1473231051',
    title: 'Rhythm of War',
    length: 2400,
    releaseDate: '2020-11-17',
    seriesBookIndex: 4,
    seriesId: 'B006K1RP8I',
    rating: 0,
    language: 'en',
    imageId: '51IY+RaNxRL',
    seriesName: 'Stormlight Archive',
    inLibrary: false,
    authors: { '0': 'Brandon Sanderson' },
  } as Book);
});

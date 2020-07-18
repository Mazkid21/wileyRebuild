// jQuery(document).ready(function () {


//     "use strict";

//     var list = jQuery('.edina_tm_portfolio_list > li');

//     list.each(function () {
//         var el = jQuery(this);
//         var el2 = el.find('.list_inner');
//         var image = el.find('.image_wrap');
//         var definition = el.find('.definition_portfolio');
//         var definitionH = el.find('.definition_portfolio').outerHeight();

//         el2.each(function () {
//             var el3 = jQuery(this);
//             el3.on('mouseenter', function () {
//                 image.css({
//                     top: -definitionH / 2
//                 });
//                 definition.css({
//                     marginTop: -definitionH
//                 });
//             }).on('mouseleave', function () {
//                 image.css({
//                     top: 0
//                 });
//                 definition.css({
//                     marginTop: 0
//                 });
//             });

//         });
//     });
// });
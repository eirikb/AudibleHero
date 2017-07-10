import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: 'Updating...'
  },

  mutations: {},

  actions: {

    loadLibrary({state}) {
      return fetch('/lib-ajax?progType=all&timeFilter=all&itemsPerPage=100000', {
        credentials: 'include',
      })
        .then(res => res.text())
        .then(res => {
          var parser = new DOMParser();
          var doc = parser.parseFromString(res, 'text/html');
          console.log(doc);
          // const parent = document.createElement('div');
          // parent.innerHTML = res;
          // console.log(parent);
          // var html = parseHtml(res.data);
          //
          // var rows = html.find("table:eq(0) tr:not(.adbl-lib-multipart-child) td[name='titleInfo']");
          // var books = [];
          // rows.each(function () {
          //   var cell = $(this);
          //   var row = cell.parent();
          //
          //   var url = cell.find("a[name='tdTitle']").attr('href').trim();
          //
          //   books.push({
          //     id: _.last(url.split('/')),
          //     title: cell.find("a[name='tdTitle']").text().trim(),
          //     authors: _.map(row.find("a[href*='searchAuthor']").text().split(','), function (author) {
          //       return author.trim();
          //     }),
          //     datePurchased: row.find("td:eq(6)").text().trim(),
          //     downloaded: row.find("[alt='Downloaded']").length > 0
          //   });
          // });
          // return books;
          // });
          // };
        });
    }
  }
});
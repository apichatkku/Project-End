var tab_text;
var data_type = 'data:application/vnd.ms-excel';

function fnExcelReport() {
  var Messages = "\n message1.\n message2.";
  var ListOfMessages = Messages.split(".");

  tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
  tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';

  tab_text = tab_text + '<x:Name>Error Messages</x:Name>';

  tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
  tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';

  tab_text = tab_text + "<table border='1px'>";
  tab_text = tab_text + $('#tbscore').html();;
  tab_text = tab_text + '</table></body></html>';

  data_type = 'data:application/vnd.ms-excel';

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    if (window.navigator.msSaveBlob) {
      var blob = new Blob([tab_text], {
        type: "application/csv;charset=utf-8;"
      });
      navigator.msSaveBlob(blob, 'Test file.xlsx');
    }
  } else {
    console.log(data_type);
    console.log(tab_text);
    $('#testAnchor')[0].click()
  }
}
$($("#testAnchor")[0]).click(function () {
  console.log(data_type);
  console.log(tab_text);
  $('#testAnchor').attr('href', data_type + ', ' + encodeURIComponent(tab_text));
  $('#testAnchor').attr('download', 'score report.xls');
});
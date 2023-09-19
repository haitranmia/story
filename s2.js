
  // Define spreadsheet URL.
  var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1SmXL5EeJBodGhJcqIDIYiYWZ0AAR_QRNWHzsXcelYNA/edit#gid=574679138';

var listenButton = document.getElementById("listen");

// Thêm sự kiện click cho nút "Listen"
listenButton.addEventListener("click", function () {
  var textBContent = $('#data p:last').text();

  // Kiểm tra xem nội dung có tồn tại không
  if (textBContent.trim() !== '') {
    // Tạo một đối tượng lời nói
    var speechSynthesis = window.speechSynthesis;
    
    // Thiết lập ngôn ngữ cho lời nói thành tiếng Việt
    var lang = "vi-VN";

    // Tạo một mảng chứa các đoạn văn bản được tách ra dựa trên dấu chấm (.) và dấu ##
    var sentences = textBContent.split(/[\.|##]/);

    // Xác định thời gian tạm dừng cho mỗi loại ký tự đặc biệt
    var pauseTimes = {
      '.': 3000,   // Tạm dừng 3 giây sau dấu chấm
      '##': 5000,  // Tạm dừng 5 giây sau dấu ##
      '@@': 8000   // Tạm dừng 8 giây sau dấu @@
    };

    // Biến đếm số đoạn văn bản đã đọc xong
    var sentencesRead = 0;

    // Lặp qua các đoạn văn bản và thêm vào lời nói
    for (var i = 0; i < sentences.length; i++) {
      var sentence = sentences[i].trim();
      
      // Nếu đoạn không trống
      if (sentence !== '') {
        var speechUtterance = new SpeechSynthesisUtterance();
        speechUtterance.text = sentence;
        speechUtterance.lang = lang;
        
        // Tạm dừng dựa trên thời gian tương ứng
        if (pauseTimes[sentence] !== undefined) {
          setTimeout(function () {
            speechSynthesis.resume();
          }, pauseTimes[sentence]);
        }

        speechSynthesis.speak(speechUtterance);

        // Tăng biến đếm khi một đoạn văn bản đã đọc xong
        sentencesRead++;
      }
    }
    
    // Tự động làm mới trang sau khi tất cả các đoạn văn bản đã được đọc
    setTimeout(function () {
      if (sentencesRead === sentences.length) {
        location.reload();
      }
    }, 22000); // Đợi 5 giây trước khi tự động làm mới trang
  } else {
    // Nếu phần "text B" không có nội dung, bạn có thể thực hiện xử lý khác ở đây hoặc thông báo cho người dùng.
    alert("Không có nội dung để đọc.");
  }
});






  
  
  var loadData = function () {
    $('#data').sheetrock({
      url: mySpreadsheet,
      query: "select A,B",
      callback: function (error, options, response) {
        if (!error) {
          var rows = response.rows;
          var randomIndex = Math.floor(Math.random() * rows.length);
          var row = rows[randomIndex];
          var textA = row.cellsArray[0];
          var textB = row.cellsArray[1];

          $('#data').empty();

          // Thay thế ký tự ## bằng dấu xuống dòng mới (<br>)
          textA = textA.replace(/##/g, '<br>');
          textB = textB.replace(/##/g, '<br>');

          $('#data').append("<p style='text-align: center;font-size: 50px; font-weight:bold; margin-bottom: 2em '>" + '"' + textA + '"' + "</p>");
          $('#data').append("<p style='text-align: center; font-size: 30px; '>" + textB + "</p>");

          // Tự động phát âm thanh sau khi dữ liệu được tải
          setTimeout(function () {
            listenButton.click(); // Kích hoạt sự kiện click của nút "Listen"
          }, 3000); // Đợi 3 giây trước khi tự động phát âm thanh
        }
      }
    });
  };

  $('#next').click(function () {
    location.reload(); // Tự động làm mới trang khi nhấp vào nút "Next"
  });

  loadData();

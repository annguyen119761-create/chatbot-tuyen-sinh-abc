
function sendMessage() {
    let input = document.getElementById("user-input");
    let chatBox = document.getElementById("chat-box");

    let question = input.value.trim().toLowerCase();

    if (question === "") return;

    chatBox.innerHTML += `
        <div class="message user">${input.value}</div>
    `;

    let answer = "Xin lỗi, tôi chưa hiểu câu hỏi. Bạn hãy hỏi về ngành học, học phí, học bổng hoặc xét tuyển nhé.";

    if (question.includes("ngành")) {
        answer = "Đại học ABC đào tạo các ngành: Công nghệ thông tin, Quản trị kinh doanh, Marketing và Ngôn ngữ Anh.";
    }
    else if (question.includes("học phí")) {
        answer = "Học phí tham khảo tại Đại học ABC là 15.000.000 đồng/học kỳ. Đây là dữ liệu mô phỏng.";
    }
    else if (question.includes("học bổng")) {
        answer = "Trường có các chương trình học bổng khuyến khích học tập và học bổng dành cho tân sinh viên.";
    }
    else if (question.includes("xét tuyển") || question.includes("tuyển sinh")) {
        answer = "Trường áp dụng các phương thức xét tuyển mô phỏng: xét điểm thi tốt nghiệp THPT, xét học bạ và xét tuyển theo phương thức riêng.";
    }

    setTimeout(function() {
        chatBox.innerHTML += `
            <div class="message bot">${answer}</div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

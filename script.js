
// Lưu dữ liệu được tải từ 5 file JSON
let duLieuTuyenSinh = null;

// Tải dữ liệu từ các file JSON
async function taiDuLieu() {
    try {
        let ketQua = await Promise.all([
            fetch("data/1-nganh-hoc.json").then(res => res.json()),
            fetch("data/2-hoc-phi.json").then(res => res.json()),
            fetch("data/3-hoc-bong.json").then(res => res.json()),
            fetch("data/4-phuong-thuc-xet-tuyen.json").then(res => res.json()),
            fetch("data/5-faq.json").then(res => res.json())
        ]);

        duLieuTuyenSinh = {
            nganh: ketQua[0],
            hocPhi: ketQua[1],
            hocBong: ketQua[2],
            xetTuyen: ketQua[3],
            faq: ketQua[4]
        };

        console.log("Đã tải dữ liệu tuyển sinh thành công!");
    } catch (loi) {
        console.error("Không thể tải dữ liệu:", loi);
    }
}

// Tải dữ liệu khi mở website
taiDuLieu();

function sendMessage() {
    let input = document.getElementById("user-input");
    let chatBox = document.getElementById("chat-box");

    let cauHoi = input.value.trim().toLowerCase();

    if (cauHoi === "") return;

    // Hiển thị câu hỏi của người dùng
    let tinNhanNguoiDung = document.createElement("div");
    tinNhanNguoiDung.className = "message user";
    tinNhanNguoiDung.textContent = input.value;
    chatBox.appendChild(tinNhanNguoiDung);

    let cauTraLoi = "Xin lỗi, tôi chưa hiểu câu hỏi. Bạn hãy hỏi về ngành học, học phí, học bổng hoặc xét tuyển nhé.";

    if (!duLieuTuyenSinh) {
        cauTraLoi = "Dữ liệu đang được tải. Bạn vui lòng thử lại sau giây lát.";
    }

    else if (cauHoi.includes("ngành")) {
        let danhSach = duLieuTuyenSinh.nganh.nganh_hoc;

        cauTraLoi = "Đại học ABC hiện có các ngành:\n";

        danhSach.forEach(nganh => {
            cauTraLoi += "- " + nganh.ten_nganh + ": " + nganh.mo_ta + "\n";
        });
    }

    else if (cauHoi.includes("học phí")) {
        let danhSach = duLieuTuyenSinh.hocPhi.hoc_phi;

        cauTraLoi = "Học phí mô phỏng của các ngành:\n";

        danhSach.forEach(nganh => {
            cauTraLoi += "- " + nganh.nganh + ": " +
                nganh.hoc_phi_hoc_ky.toLocaleString("vi-VN") +
                " đồng/học kỳ\n";
        });
    }

    else if (cauHoi.includes("học bổng")) {
        let danhSach = duLieuTuyenSinh.hocBong.hoc_bong;

        cauTraLoi = "Các chương trình học bổng của trường:\n";

        danhSach.forEach(hocBong => {
            cauTraLoi += "- " + hocBong.ten_hoc_bong +
                ": " + hocBong.gia_tri + "\n";
        });
    }

    else if (cauHoi.includes("xét tuyển") || cauHoi.includes("tuyển sinh")) {
        let danhSach = duLieuTuyenSinh.xetTuyen.phuong_thuc_xet_tuyen;

        cauTraLoi = "Các phương thức xét tuyển mô phỏng:\n";

        danhSach.forEach(phuongThuc => {
            cauTraLoi += "- " + phuongThuc.ten +
                ": " + phuongThuc.mo_ta + "\n";
        });
    }

    else {
        let danhSach = duLieuTuyenSinh.faq.faq;

        let ketQua = danhSach.find(item =>
            item.cau_hoi.toLowerCase().split(" ").some(tu =>
                tu.length > 3 && cauHoi.includes(tu)
            )
        );

        if (ketQua) {
            cauTraLoi = ketQua.tra_loi;
        }
    }

    // Hiển thị câu trả lời
    setTimeout(function() {
        let tinNhanBot = document.createElement("div");
        tinNhanBot.className = "message bot";
        tinNhanBot.style.whiteSpace = "pre-line";
        tinNhanBot.textContent = cauTraLoi;

        chatBox.appendChild(tinNhanBot);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

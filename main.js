let listExam = {
  1: {
    examName: "Giữa kì môn Triết học Mac-Lenin 1",
    examType: "Tự do",
    examDescription: "",
    examCreatedAt: "29-2-2024",
    examlistQuestion: {
      1: {
        topic: "Chọn cách diễn đạt đúng về năng suất lao động?",
        listAnswer: {
          A: "Năng suất lao động là số sản phẩm được sản xuất ra trong doanh nghiệp",
          B: "Năng suất lao động là năng lực sản xuất của người lao động",
          C: "Năng suất lao động là khả năng cụ thể lao động",
          D: "Cả A và B",
        },
        correctAnswer: "A",
      },
      2: {
        topic: "Hãy chỉ ra nhận định đúng về chủ nghĩa tư bản độc quyền",
        listAnswer: {
          A: "Độc quyền không có khả năng và không bành trướng sang các lĩnh vực chính trị, xã hội",
          B: "Kết hợp với nhà nước hình thành độc quyền nhà nước chi phối quan hệ, đường lỗi đối nội với đối ngoại của quốc gia",
          C: "Không vì lợi ích của các tổ chức độc quyền, vì lợi ích của đa số nhân dân lao động",
          D: "Không kết hợp với các nhân viên chính phủ để thực hiện mục đích lợi ích nhóm",
        },
        correctAnswer: "A",
      },
      3: {
        topic: "Hàng hóa có 2 thuộc tính giá trị sử dụng và giá trị bởi vì:",
        listAnswer: {
          A: "Lao động của người sản xuất hàng hóa có tính hai mặt: lao động cụ thể và lao động trừu tượng",
          B: "Hai thuộc tính này gắn với hàng hóa",
          C: "Hàng hóa có hai mặt: lao động cụ thể và lao động trừu tượng",
          D: "Cả B và C",
        },
        correctAnswer: "C",
      },
      4: {
        topic: "Chọn đáp án đúng",
        listAnswer: {
          A: "Về mặt chính trị, hệ thống các nhà tài phiệt chi phối mọi hoạt động của các cơ quan nhà nước",
          B: "Về mặt chính trị, hệ thống các nhà tài phiệt luôn ủng hộ mọi hoạt động của các cơ quan nhà nước",
          C: "Về mặt chính trị, hệ thống các nhà tài phiệt luôn ủng hộ các phong trào đấu tranh của giai cấp công nhân",
          D: "Cả 3 đáp án",
        },
        correctAnswer: "A",
      },
    },
  },
  2: {
    examName: "Cuối kì môn Vật lí 2, 3",
    examType: "Thời gian cụ thể",
    examDescription: "",
    examCreatedAt: "29-2-2024",
    examTime: "20-2-2024",
    examlistQuestion: {
      1: {
        topic: "Hiện tượng giao thoa ánh sáng chứng tỏ",
        listAnswer: {
          A: "Tính chất gián đoạn của ánh sáng",
          B: "Ánh sáng là một sống dọc",
          C: "Bản chất sóng của ánh sáng",
          D: "Ánh sáng là một sóng ngang",
        },
        correctAnswer: "A",
      },
      2: {
        topic: "Giao thoa ánh sáng là hiện tượng",
        listAnswer: {
          A: "Gặp nhau của hai hay nhiều sóng ánh sáng tự nhiên",
          B: "Gặp nhau của hai hay nhiều sóng ánh sáng kết hợp",
          C: "Gặp nhau của hai hay nhiều sóng ánh sáng phân cực",
          D: "Gặp nhau của hai nhiều sóng ánh sáng phân cực",
        },
        correctAnswer: "B",
      },
    },
  },
};
let questionIndex = 0;
let listQuestion = {};

const redirectToNewPage = (new_page, paramName, paramValue) => {
  if (paramName !== undefined && paramValue !== undefined) {
    const encodedParamName = encodeURIComponent(paramName);
    const encodedParamValue = encodeURIComponent(paramValue);

    const separator = new_page.includes("?") ? "&" : "?";

    window.location.href = `${new_page}${separator}${encodedParamName}=${encodedParamValue}`;
  } else {
    window.location.href = new_page;
  }
};

//Edit  page
const closePopUp = () => {
  document.getElementById("popup").style["visibility"] = "hidden";
};

const openPopUp = (examId, questionId) => {
  document.getElementById("popup").style["visibility"] = "visible";

  const question = listExam[examId]["examlistQuestion"][questionId];
  const { topic, listAnswer, correctAnswer } = question;

  //Chèn câu hỏi
  document.getElementById("edit-topic-input").value = topic;
  document.getElementById("edit-answer-a-input").value = listAnswer["A"];
  document.getElementById("edit-answer-b-input").value = listAnswer["B"];
  document.getElementById("edit-answer-c-input").value = listAnswer["C"];
  document.getElementById("edit-answer-d-input").value = listAnswer["D"];

  //Thêm onclick cho 2 button xóa và lưu
  document.getElementById("popup-del-question").onclick = function () {
    delQuestion(examId, questionId);
  };
  document.getElementById("popup-save-question").onclick = function () {
    saveQuestion(examId, questionId);
  };

  const radioInputs = document.getElementsByName("edit-answer");
  for (let i = 0; i < radioInputs.length; i++) {
    if (radioInputs[i].value === correctAnswer) {
      radioInputs[i].checked = true;
      break;
    }
  }
};

const delQuestion = (examId, questionId) => {
  delete listExam[examId]["examlistQuestion"][questionId];
  loadManageExamPage(examId);
  closePopUp();
};

const saveQuestion = (examId, questionId) => {
  const topic = document.getElementById("edit-topic-input").value;
  const answer_a = document.getElementById("edit-answer-a-input").value;
  const answer_b = document.getElementById("edit-answer-b-input").value;
  const answer_c = document.getElementById("edit-answer-c-input").value;
  const answer_d = document.getElementById("edit-answer-d-input").value;

  let correctAnswer = "";
  const radioInputs = document.getElementsByName("edit-answer");
  for (let i = 0; i < radioInputs.length; i++) {
    if (radioInputs[i].checked === true) {
      correctAnswer = radioInputs[i].value;
      break;
    }
  }

  const editedQuestion = {
    topic: topic,
    listAnswer: {
      A: answer_a,
      B: answer_b,
      C: answer_c,
      D: answer_d,
    },
    correctAnswer: correctAnswer,
  };

  listExam[examId]["examlistQuestion"][questionId] = editedQuestion;
  loadManageExamPage(examId);
  closePopUp();
};

const delExam = () => {
  const examId = new URLSearchParams(window.location.search).get("id");
  document.addEventListener("DOMContentLoaded", loadManageExamPage(examId));

  delete listExam[examId];
  console.log(listExam);

  // loadExamPage();
};

//Add page
const addQuestion = (
  topic,
  answer_a,
  answer_b,
  answer_c,
  answer_d,
  correct_answer
) => {
  const newQuestionBox = document.createElement("div");
  const newQuestion = {
    topic: "",
    listAnswer: {
      A: "",
      B: "",
      C: "",
      D: "",
    },
    correctAnswer: "A",
  };

  newQuestionBox.classList.add("question-box");
  newQuestionBox.id = `questionIndex-${questionIndex}`;

  const answerContainer = document.createElement("div");
  answerContainer.innerHTML = `
    <span class="topic"
      >${topic}</span
    >
    <form onchange="onChangeCorrectAnswer(this, ${questionIndex})">
      <label class="answer">
        <input type="radio" name="answer" value="A"  ${
          correct_answer === "A" ? "checked" : ""
        } /> A.
        ${answer_a}
      </label>
      <label class="answer">
        <input type="radio" name="answer" value="B" ${
          correct_answer === "B" ? "checked" : ""
        }/> B.
        ${answer_b}
      </label>
      <label class="answer">
        <input type="radio" name="answer" value="C" ${
          correct_answer === "C" ? "checked" : ""
        }/> C.
         ${answer_c}
      </label>
      <label class="answer">
        <input type="radio" name="answer" value="D" ${
          correct_answer === "D" ? "checked" : ""
        }/> D.
        ${answer_d}
      </label>
    </form>
  `;
  newQuestionBox.appendChild(answerContainer);

  document.getElementById("list-question-box").appendChild(newQuestionBox);

  newQuestion["topic"] = topic;
  newQuestion["listAnswer"]["A"] = answer_a;
  newQuestion["listAnswer"]["B"] = answer_b;
  newQuestion["listAnswer"]["C"] = answer_c;
  newQuestion["listAnswer"]["D"] = answer_d;

  listQuestion[questionIndex] = newQuestion;

  questionIndex += 1;
};

const addQuestionByManual = () => {
  const topic = document.getElementById("topic-input").value;
  const answer_a = document.getElementById("answer-a-input").value;
  const answer_b = document.getElementById("answer-b-input").value;
  const answer_c = document.getElementById("answer-c-input").value;
  const answer_d = document.getElementById("answer-d-input").value;
  const correct_answer = "A";

  addQuestion(topic, answer_a, answer_b, answer_c, answer_d, correct_answer);
};

const addQuestionByFile = () => {
  console.log("add question");
  const input = document.getElementById("create-file-input");

  if (input.files.length > 0) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const sheetName = workbook.SheetNames[0];

      const sheet = workbook.Sheets[sheetName];
      const lastRow = parseInt(sheet["!ref"].split(":")[1].match(/\d+/)[0]);
      for (let i = 2; i <= lastRow; i++) {
        const topic = sheet[`A${i}`].v;
        const answer_a = sheet[`B${i}`].v;
        const answer_b = sheet[`C${i}`].v;
        const answer_c = sheet[`D${i}`].v;
        const answer_d = sheet[`E${i}`].v;
        const correct_answer = sheet[`F${i}`].v;
        console.log("topic: ", topic);
        addQuestion(
          topic,
          answer_a,
          answer_b,
          answer_c,
          answer_d,
          correct_answer
        );
      }
    };
    reader.readAsArrayBuffer(file);
  }
};

function parseSheet(sheet) {
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 1 });
  const result = [];
  let currentQuestion = {};

  for (const row of data) {
    if (row[0].startsWith("Câu")) {
      if (Object.keys(currentQuestion).length > 0) {
        result.push(currentQuestion);
      }

      currentQuestion = { question: row[0], options: [] };
    } else {
      const option = { A: row[1], B: row[2], C: row[3], D: row[4] };
      currentQuestion.options.push(option);
    }
  }

  if (Object.keys(currentQuestion).length > 0) {
    result.push(currentQuestion);
  }

  return result;
}

const onChangeCorrectAnswer = (form, id) => {
  const selectedValue = form.querySelector(
    'input[name="answer"]:checked'
  ).value;
  listQuestion[id]["correctAnswer"] = selectedValue;
};

const saveNewExam = () => {
  const dateNow = Date.now();
  const newExam = {
    examName: document.getElementById("exam-name").value,
    examType: document.getElementById("exam-type").value,
    examDescription: document.getElementById("exam-description").value,
    examCreatedAt: "29-2-2024",
    examlistQuestion: listQuestion,
  };
  listExam[dateNow] = newExam;
  console.log(newExam);
};

const loadExamPage = () => {
  let examId = 1;
  Object.keys(listExam).forEach((examKey) => {
    const {
      examName,
      examType,
      examDescription,
      examCreatedAt,
      examlistQuestion,
    } = listExam[examKey];

    const examRow = document.createElement("tr");
    examRow.onclick = function () {
      redirectToNewPage("manage-exam.html", "id", examKey);
    };

    examRow.innerHTML = `
      <td>${examId++}</td>
      <td>${examName}</td>
      <td>${examType}</td>
      <td>${Object.keys(examlistQuestion).length}</td>
      <td>${examCreatedAt}</td>
      <td class="description-col">
        ${examDescription}
      </td>
  `;

    document.getElementById("exam-list").appendChild(examRow);
  });
};

const loadManageExamPage = (examId) => {
  const exam = listExam[examId];
  const {
    examName,
    examType,
    examDescription,
    examCreatedAt,
    examTime,
    examlistQuestion,
  } = exam;

  // Chèn thông tin chung
  document.getElementById("manage-exam-name").innerText = examName;
  document.getElementById("manage-general-exam-name").innerText = examName;
  document.getElementById("manage-exam-time").innerText = examTime
    ? examTime
    : "";
  document.getElementById("manage-exam-type").innerText = examType;
  document.getElementById("manage-exam-question-total").innerText =
    Object.keys(examlistQuestion).length;

  //Xóa tất cả các câu hỏi đang có
  const manageQuestionContent = document.getElementById(
    "manage-quetion-content"
  );

  while (manageQuestionContent.firstChild) {
    manageQuestionContent.removeChild(manageQuestionContent.firstChild);
  }

  //Thêm câu hỏi
  let questionIndex = 1;
  Object.keys(examlistQuestion).forEach((questionId) => {
    const question = examlistQuestion[questionId];
    const { topic, listAnswer, correctAnswer } = question;

    const newQuestionBox = document.createElement("div");
    newQuestionBox.classList.add("question-box");
    newQuestionBox.onclick = function () {
      openPopUp(examId, questionId);
    };
    const answerContainer = document.createElement("div");
    answerContainer.innerHTML = `
    <span class="topic"
      >Câu ${questionIndex++}:</span
    >
    <span>${topic}</span>
    <div class="manage-list-answer">
      <span class="answer"> 
        A. ${listAnswer["A"]}
      </span>
       <span class="answer"> 
        B. ${listAnswer["B"]}
      </span>
       <span class="answer"> 
        C. ${listAnswer["C"]}
      </span>
       <span class="answer"> 
        D. ${listAnswer["D"]}
      </span>
    </div>
    <div><span>Đáp án đúng: ${correctAnswer}</span></div>
  `;
    newQuestionBox.appendChild(answerContainer);

    document
      .getElementById("manage-quetion-content")
      .appendChild(newQuestionBox);
  });
};

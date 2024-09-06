// 도서 데이터를 담을 배열
// 전역변수
let books = [];

// 도서 등록 함수
function registerBook() {
  const category = document.getElementById('category').value;
  const bookname = document.getElementById('bookname').value;
  const bookprice = document.getElementById('bookprice').value;

  // 유효성 검사, 빈 값이 있는지 확인
  // 카테고리 검사
  if (!category) {
    alert('카테고리를 선택해주세요');
    return;
  }
  // 도서명 검사
  if (!bookname) {
    alert('도서명은 필수 입력 사항입니다');
    return;
  }
  // 가격 검사
  if (!bookprice) {
    alert('가격은 필수 입력 사항입니다');
    return;
  }

  // 동일한 카테고리의 도서명이 있는지 확인
  const isBook = books.find(book => book.category === category && book.bookname === bookname);
  if (isBook) {
    alert('해당 카테고리의 도서명이 이미 존재합니다.');
    return;
  }

  // 도서 번호는 배열 길이로
  const bookNo = books.length + 1;

  // 도서 객체 생성
  const newBook = {
    bookNo,
    category,
    bookname,
    bookprice: Number(bookprice)
  };

  // 도서 목록에 추가
  books.push(newBook);
  updateBookList();

  // 도서 등록 form 초기화
  document.querySelector('form').reset();
}


// 도서 목록을 업데이트하는 함수
// 매개변수를 받으면 filteredBooks 저장
// 아니면 books 사용
// 유연성이 좋음!
function updateBookList(filteredBooks = books) {
  // 테이블 바디 변수
  const tbody = document.getElementById('book-list-tbody');
  // 테이블 바디 초기화 상태로
  tbody.innerHTML = '';

  // 배열을 순회해서 html 작성
  filteredBooks.forEach(book => {
    // tr 태그 생성
    const row = document.createElement('tr');

    // row 자식에 추가
    row.innerHTML = `
            <td>${book.bookNo}</td>
            <td>${book.category}</td>
            <td>${book.bookname}</td>
            <td>${book.bookprice.toLocaleString()}원</td>
            <td><button onclick="deleteBook(${book.bookNo})">삭제</button></td>
        `;

    // 테이블 바디에 자식으로 tr td 추가
    tbody.appendChild(row);
  });

  // 등록, 삭제, 정렬, 검색 확인용 콘솔
  console.log(books);
}


// 도서 삭제 함수
function deleteBook(bookNo) {
  //  books.filter()는 조건에 맞는것만 전달
  // !== 도서번호가 다른것들만 필터링 해서 전달
  books = books.filter(book => book.bookNo !== bookNo);
  updateBookList();
}


// 도서 정렬 함수
// 셀렉트가 변경될때 실행
document.getElementById('sort-select').addEventListener('change', function () {
  // 셀렉트 벨류를 저장하는 변수
  const sortValue = this.value;

  // books 배열을 복사하는 변수
  // 원본을 보존하기
  let sortedBooks = [...books];

  // 셀렉트 벨류가 ascending와 같으면 오름차순
  // 셀렉트 벨류가 descending와 같으면 내림차순
  // 빼기로 음수, 양수 확인
  if (sortValue === 'ascending') {
    sortedBooks.sort((a, b) => a.bookprice - b.bookprice);
  } else if (sortValue === 'descending') {
    sortedBooks.sort((a, b) => b.bookprice - a.bookprice);
  }

  // 복사한 배열을 오름, 내림차순으로 변경
  // 그 값을 매개변수로 해서
  // updateBookList() 함수 호출
  updateBookList(sortedBooks);
});


// 도서 검색 함수
document.getElementById('search-btn').addEventListener('click', function () {

  // 입력한 검색어 벨류를 변수에 저장
  // trim()는 앞뒤 공백제거
  // toLowerCase() 소문자로 변경
  // 검색시 소문자 대문자 구분없이 검색되게 하기 위해
  const searchKeyword = document.getElementById('search-input').value.trim().toLowerCase();

  // 검색창이 공백인지 확인
  if (!searchKeyword) {
    alert('검색어를 입력하세요.');
    return;
  }


  //  book.bookname.toLowerCase()는 소문자로 변경
  // includes(searchKeyword)는 배열안에 
  // 같은 이름이 포함되어 있는지 확인
  // 있다면 filteredBooks 변수에 포함
  const filteredBooks = books.filter(book => book.bookname.toLowerCase().includes(searchKeyword));

  // 필터링한 값을 매개변수로 해서 
  // updateBookList() 함수 호출
  updateBookList(filteredBooks);
});

export default {
  goal: [
    'Giải thích được tham lam bằng ví dụ chọn lịch làm việc trong ngày.',
    'Chỉ ra được một trường hợp tham lam cho kết quả sai và nói được vì sao.',
    'Giải đúng bài Activity Selection và bài Đổi tiền trong đề.',
  ],
  examples: [
    { id: 'vd-activity-selection', title: 'Activity Selection — chọn nhiều việc nhất', official: true },
    { id: 'vd-doi-tien', title: 'Đổi tiền với số tờ ít nhất', official: true },
  ],
  quiz: [
    {
      q: 'Tham lam khác vét cạn (thử mọi khả năng) ở điểm cốt lõi nào?',
      options: [
        'Tham lam không thử lại một lựa chọn đã bỏ qua — chọn xong là chốt luôn, không quay lại xét phương án khác',
        'Tham lam luôn chạy nhanh hơn vét cạn nên chắc chắn cho kết quả đúng',
        'Tham lam chỉ dùng được khi bài toán có dữ liệu đã sắp xếp sẵn',
      ],
      answer: 0,
      why: 'Vét cạn (hoặc quay lui) thử hết các nhánh rồi mới chọn cái tốt nhất; tham lam chỉ nhìn tình huống hiện tại, chọn cái tốt nhất ngay lúc đó và không bao giờ xét lại — nhanh hơn nhưng cũng vì thế mà không phải bài nào cũng đúng.',
    },
    {
      q: 'Trong Activity Selection, phải sắp xếp danh sách hoạt động theo tiêu chí nào để tham lam chọn đúng?',
      options: [
        'Thời điểm bắt đầu tăng dần',
        'Thời điểm kết thúc tăng dần',
        'Thời lượng (kết thúc trừ bắt đầu) tăng dần',
      ],
      answer: 1,
      why: 'Hoạt động kết thúc sớm nhất luôn "nhường chỗ" sớm nhất cho các hoạt động còn lại, nên chọn nó trước không bao giờ làm mất đi một lựa chọn tốt hơn — sắp theo bắt đầu hoặc theo thời lượng đều có phản ví dụ khiến tham lam sai.',
    },
    {
      q: 'Với bộ mệnh giá nào thì chiến lược tham lam "luôn lấy đồng lớn nhất trước" cho ra đáp án SAI khi đổi tiền?',
      options: [
        '{1, 5, 10, 25}, đổi 63đ',
        '{1, 3, 4}, đổi 6đ',
        '{25, 10, 5, 1}, đổi 41đ',
      ],
      answer: 1,
      why: 'Với {1,3,4} đổi 6đ, tham lam lấy 4 trước rồi 2 đồng 1 → 3 đồng, nhưng đáp án tốt nhất chỉ cần 3+3=6, tức 2 đồng — tham lam sai vì hệ mệnh giá này không "chuẩn". Hai bộ còn lại là hệ tiền chuẩn nên tham lam vẫn đúng.',
    },
    {
      q: 'Làm sao để biết chắc tham lam giải đúng một bài toán, chứ không phải "đúng do may"?',
      options: [
        'Thử một vài bộ dữ liệu nhỏ, nếu ra đúng thì tham lam đúng',
        'Chứng minh được lựa chọn tham lam ở mỗi bước là "an toàn" (không làm mất lời giải tối ưu) và bài toán con còn lại vẫn tối ưu được bằng đúng chiến lược đó',
        'Cứ code tham lam trước, sai thì đổi qua quy hoạch động sau',
      ],
      answer: 1,
      why: 'Thử vài ví dụ chỉ cho thấy tham lam không sai ở NHỮNG ví dụ đó — bộ mệnh giá {1,3,4} cũng "nhìn có vẻ ổn" nếu không thử đúng số 6. Phải chứng minh chặt chẽ 2 điều kiện (lựa chọn an toàn + bài toán con tối ưu) mới chắc chắn tham lam đúng với mọi input.',
    },
  ],
  practice: [
    {
      title: 'Nối các đoạn dây thành một đoạn duy nhất với tổng chi phí nhỏ nhất, biết chi phí mỗi lần nối bằng tổng độ dài hai đoạn được nối.',
      idea: 'Một đoạn dây bị cộng dồn chi phí thêm một lần mỗi khi nó nằm trong một lượt nối — nên đoạn có độ dài nhỏ cần được nối càng sớm càng tốt để chỉ bị cộng dồn ít lần. Vậy mỗi bước luôn lấy hai đoạn nhỏ nhất hiện có ra nối.',
      hint: 'Dùng hàng đợi ưu tiên kiểu lấy nhỏ nhất trước (min-heap): lấy 2 phần tử nhỏ nhất, cộng lại, đưa tổng trở lại heap, lặp tới khi heap còn 1 phần tử.',
    },
    {
      title: 'Phân phát kẹo cho n em nhỏ theo mức độ đòi hỏi, mỗi em một cái kẹo, sao cho nhiều em được thỏa mãn nhất có thể (mức đòi hỏi của em ≤ kích cỡ kẹo được nhận).',
      idea: 'Em đòi hỏi ít nhất nên được ghép với cái kẹo nhỏ nhất mà vẫn thỏa mãn được em đó — dùng kẹo to cho một em dễ tính là lãng phí một cơ hội làm hài lòng một em khác khó tính hơn.',
      hint: 'Sắp cả hai mảng (mức đòi hỏi của các em, kích cỡ các cái kẹo) tăng dần; dùng 2 con trỏ, mỗi lần kẹo hiện tại đủ lớn thì ghép và tăng cả 2 con trỏ, không đủ thì chỉ tăng con trỏ kẹo.',
    },
    {
      title: 'Cho danh sách cuộc họp CHƯA được sắp xếp, mỗi cuộc có [bắt đầu, kết thúc]. Xếp được tối đa bao nhiêu cuộc họp vào một phòng duy nhất, không cuộc nào chồng giờ?',
      idea: 'Đây đúng là bài Activity Selection, chỉ khác một chỗ: dữ liệu đề bài chưa sắp xếp sẵn theo giờ kết thúc như ví dụ chính thức — bước sắp xếp là bước đầu tiên phải tự làm trước khi áp dụng lại đúng thuật toán đã học.',
      hint: 'Sort mảng cuộc họp theo giờ kết thúc tăng dần, rồi quét một lượt: cuộc nào có giờ bắt đầu ≥ giờ kết thúc của cuộc vừa chọn thì chọn tiếp, giữ nguyên phần thuật toán của Activity Selection.',
    },
  ],
  leetcode: [
    { no: 455, name: 'Assign Cookies', slug: 'assign-cookies', level: 'Easy', note: 'Tham lam sau khi sắp xếp, dễ nhất để bắt đầu.' },
    { no: 860, name: 'Lemonade Change', slug: 'lemonade-change', level: 'Easy', note: 'Đổi tiền phiên bản rút gọn.' },
    { no: 121, name: 'Best Time to Buy and Sell Stock', slug: 'best-time-to-buy-and-sell-stock', level: 'Easy', note: 'Giữ giá nhỏ nhất đã gặp, tham lam 1 vòng lặp.' },
    { no: 122, name: 'Best Time to Buy and Sell Stock II', slug: 'best-time-to-buy-and-sell-stock-ii', level: 'Medium', note: 'Gom mọi đoạn tăng, lựa chọn tham lam an toàn.' },
    { no: 55, name: 'Jump Game', slug: 'jump-game', level: 'Medium', note: 'Duy trì tầm với xa nhất.' },
    { no: 45, name: 'Jump Game II', slug: 'jump-game-ii', level: 'Medium', note: 'Tham lam theo tầng, họ hàng gần với BFS.' },
    { no: 435, name: 'Non-overlapping Intervals', slug: 'non-overlapping-intervals', level: 'Medium', note: 'Đúng Activity Selection, phát biểu ngược lại.' },
    { no: 452, name: 'Minimum Arrows to Burst Balloons', slug: 'minimum-number-of-arrows-to-burst-balloons', level: 'Medium', note: 'Cùng khuôn sắp theo điểm kết thúc.' },
    { no: 621, name: 'Task Scheduler', slug: 'task-scheduler', level: 'Medium', note: 'Tham lam theo tần suất lớn nhất.' },
    { no: 135, name: 'Candy', slug: 'candy', level: 'Hard', note: 'Tham lam hai lượt trái và phải.' },
  ],
}

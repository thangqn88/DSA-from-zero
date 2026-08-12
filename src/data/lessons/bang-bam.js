export default {
  goal: [
    'Giải thích được bảng băm bằng hình ảnh tủ đựng đồ có số ngăn cố định.',
    'Phân biệt được Map là hợp đồng còn hash table chỉ là một cách thực hiện hợp đồng đó.',
    'Tự cài được bảng băm có xử lý va chạm và tự tăng kích thước khi đầy.',
    'Nói được vì sao O(1) của bảng băm là trung bình chứ không phải xấu nhất.',
  ],
  // Không có trường examples ở đây: bài này viết bằng Markdown, danh sách ví dụ
  // rút ra từ các chỉ thị @vidu trong src/content/bang-bam.md.
  quiz: [
    {
      q: 'Hàm băm dùng để làm gì trong bảng băm?',
      options: [
        'Biến khoá thành một chỉ số ngăn để biết đặt hoặc tìm dữ liệu ở đâu',
        'Mã hoá dữ liệu để người khác không đọc được',
        'Sắp xếp các khoá theo thứ tự tăng dần',
      ],
      answer: 0,
      why: 'Hàm băm nhận một khoá bất kỳ — chuỗi, số, cấu trúc — và trả về một số nguyên, rồi ta lấy số đó chia dư cho số ngăn để ra chỉ số ngăn. Nhờ vậy tìm một khoá không phải duyệt cả bảng mà nhảy thẳng tới đúng ngăn. Nó không phải mã hoá: hàm băm ở đây không cần bí mật, chỉ cần rải đều. Và nó cũng không sắp xếp gì — thực tế bảng băm phá vỡ hoàn toàn thứ tự của khoá, đó là cái giá phải trả để đổi lấy tốc độ.',
    },
    {
      q: 'Hai khoá khác nhau cùng rơi vào một ngăn thì gọi là gì, và xử lý thế nào?',
      options: [
        'Va chạm; xử lý bằng cách cho mỗi ngăn giữ một danh sách, hoặc dò sang ngăn kế tiếp',
        'Lỗi chương trình; phải báo lỗi và dừng lại',
        'Trùng khoá; phải ghi đè giá trị cũ',
      ],
      answer: 0,
      why: 'Số khoá có thể có là vô hạn còn số ngăn thì hữu hạn, nên va chạm là chuyện chắc chắn xảy ra chứ không phải sự cố. Hai cách xử lý phổ biến: chuỗi móc nối, mỗi ngăn giữ một danh sách các cặp cùng rơi vào đó; và dò tuyến tính, nếu ngăn bận thì thử ngăn kế tiếp cho tới khi gặp ngăn trống. Chú ý phân biệt với trùng khoá: trùng khoá là cùng một khoá được đặt hai lần, khi đó ghi đè mới đúng.',
    },
    {
      q: 'Vì sao nói bảng băm tra cứu O(1) nhưng đó là O(1) trung bình chứ không phải xấu nhất?',
      options: [
        'Vì nếu hàm băm rải kém, mọi khoá dồn vào một ngăn và tra cứu thoái hoá thành O(n)',
        'Vì máy tính đôi khi chạy chậm hơn bình thường',
        'Vì lần tra cứu đầu tiên bao giờ cũng chậm hơn các lần sau',
      ],
      answer: 0,
      why: 'O(1) của bảng băm dựa trên giả định các khoá rải tương đối đều ra các ngăn, khi đó mỗi ngăn chỉ giữ vài phần tử và tìm trong đó tốn thời gian gần như cố định. Nếu hàm băm tồi — ví dụ băm chuỗi bằng cách chỉ lấy ký tự đầu — thì hàng nghìn khoá dồn vào cùng một ngăn, và bảng băm biến thành đúng một danh sách liên kết dài, tra cứu mất O(n). Đây là điểm khác biệt căn bản so với cây cân bằng: cây cho bạn O(log n) chắc chắn trong mọi trường hợp, còn bảng băm cho bạn O(1) với điều kiện.',
    },
    {
      q: 'Hệ số tải vượt ngưỡng thì bảng băm phải làm gì?',
      options: [
        'Cấp phát bảng mới lớn hơn và băm lại toàn bộ khoá cũ vào bảng mới',
        'Từ chối không nhận thêm khoá nào nữa',
        'Xoá bớt các khoá cũ để lấy chỗ',
      ],
      answer: 0,
      why: 'Hệ số tải là số phần tử chia cho số ngăn. Khi nó vượt ngưỡng thường chọn là 0,75 thì các ngăn bắt đầu đông và tốc độ tra cứu tụt đi. Cách xử lý là cấp bảng mới lớn gấp đôi rồi băm lại mọi khoá cũ — bắt buộc phải băm lại chứ không sao chép nguyên vị trí, vì chỉ số ngăn phụ thuộc vào số ngăn. Một lần nở ra tốn O(n), nhưng vì nó chỉ xảy ra sau mỗi lần số phần tử tăng gấp đôi nên tính bình quân mỗi lần thêm vẫn là O(1) — đúng lối phân tích khấu trừ bạn đã gặp ở bài Mảng động.',
    },
    {
      q: 'Ôn lại bài trước: một thuật toán O(n) và một thuật toán O(1) cùng chạy trên n = 10⁶. Khác biệt về số phép toán là bao nhiêu?',
      options: [
        'Một triệu lần: O(n) làm khoảng 10⁶ bước, O(1) làm khoảng 1 bước bất kể n lớn cỡ nào',
        'Không đáng kể, vì cả hai đều là hàm tuyến tính',
        'Đúng 1000 lần',
      ],
      answer: 0,
      recall: true,
      why: 'Đây chính là lý do bảng băm đáng để bạn tự cài. Tìm một khoá bằng cách duyệt toàn bộ mảng là O(n): với một triệu bản ghi thì mất một triệu bước. Tìm bằng bảng băm là O(1): tính hàm băm một lần, nhảy tới đúng ngăn, xong. Nếu chương trình của bạn tra cứu một nghìn lần trong một giây, khác biệt đó là giữa việc chạy tức thì và việc treo máy chủ. Nhớ lại bảng mốc phản xạ ở bài Độ phức tạp: chính con số 10⁸ phép toán mỗi giây quyết định ranh giới này.',
    },
  ],
  practice: [
    {
      title: 'Cài bảng băm ánh xạ chuỗi sang số nguyên, xử lý va chạm bằng chuỗi móc nối, hỗ trợ ba thao tác đặt, lấy và xoá.',
      idea: 'Dùng một mảng các danh sách liên kết. Hàm băm chuỗi theo kiểu đa thức: duyệt từng ký tự, mã = mã × 31 + ký tự, lấy dư cho số ngăn ở cuối. Đặt thì tìm trong danh sách của ngăn xem khoá đã có chưa, có thì ghi đè, chưa thì thêm vào đầu danh sách. Xoá thì gỡ nút khỏi danh sách.',
      hint: 'Lấy dư ở cuối chứ đừng lấy dư sau mỗi ký tự nếu dùng kiểu số đủ lớn — nhưng phải cẩn thận tràn số, nên thực tế lấy dư dần là an toàn hơn. Chọn số ngăn là số nguyên tố giúp khoá rải đều hơn khi hàm băm chưa thật tốt.',
    },
    {
      title: 'Thêm cơ chế tự nở: khi hệ số tải vượt 0,75 thì nhân đôi số ngăn và băm lại toàn bộ. Đo thời gian trung bình mỗi lần thêm khi số phần tử tăng dần từ 1000 lên 1000000.',
      idea: 'Giữ thêm một biến đếm số phần tử. Sau mỗi lần thêm, kiểm tra tỉ lệ đếm chia cho số ngăn; vượt ngưỡng thì cấp mảng mới gấp đôi, duyệt toàn bộ bảng cũ và đặt lại từng khoá vào bảng mới bằng chính hàm đặt. Đo bằng công cụ bạn viết ở bài Độ phức tạp.',
      hint: 'Biểu đồ đo được sẽ có những cột nhô cao đột ngột — đó chính là các lần nở ra. Điều cần nhìn là đường trung bình vẫn nằm ngang, không dốc lên. Nếu nó dốc lên thì bạn đang tăng số ngăn theo cấp cộng chứ không phải cấp nhân.',
    },
    {
      title: 'Cho một hàm băm cố tình tồi — chỉ lấy độ dài chuỗi làm mã băm. Nạp mười nghìn từ vào bảng rồi đo thời gian tra cứu, so với hàm băm đa thức ở bài trên.',
      idea: 'Độ dài từ tiếng Anh gần như luôn nằm trong khoảng 1 tới 20, nên mọi từ dồn vào đúng hai chục ngăn đầu tiên, mỗi ngăn giữ khoảng năm trăm từ. Tra cứu khi đó phải duyệt danh sách năm trăm phần tử thay vì vài phần tử.',
      hint: 'Đây là bài tập cho bạn thấy tận mắt vì sao O(1) của bảng băm có điều kiện. Hãy in ra phân bố số phần tử theo ngăn cho cả hai hàm băm — hai biểu đồ đó nói nhiều hơn mọi con số thời gian.',
    },
  ],
  leetcode: [
    { no: 1, name: 'Two Sum', slug: 'two-sum', level: 'Easy', note: 'Bài kinh điển nhất của bảng băm. Làm lại bằng bảng băm tự cài của bạn.' },
    { no: 217, name: 'Contains Duplicate', slug: 'contains-duplicate', level: 'Easy', note: 'So ba cách như ở bài Độ phức tạp, giờ bạn đã hiểu vì sao cách dùng tập hợp nhanh nhất.' },
    { no: 242, name: 'Valid Anagram', slug: 'valid-anagram', level: 'Easy', note: 'Đếm tần suất ký tự. Thử cả mảng 26 phần tử lẫn bảng băm, so hai cách.' },
    { no: 383, name: 'Ransom Note', slug: 'ransom-note', level: 'Easy', note: 'Cùng dạng đếm tần suất, luyện thao tác trừ dần.' },
    { no: 349, name: 'Intersection of Two Arrays', slug: 'intersection-of-two-arrays', level: 'Easy', note: 'Giao hai tập. Chú ý khử trùng lặp ở kết quả.' },
    { no: 205, name: 'Isomorphic Strings', slug: 'isomorphic-strings', level: 'Easy', note: 'Cần hai bảng ánh xạ ngược chiều nhau, không phải một.' },
    { no: 49, name: 'Group Anagrams', slug: 'group-anagrams', level: 'Medium', note: 'Khoá của bảng là chuỗi đã sắp ký tự — bài dạy cách chọn khoá khéo.' },
    { no: 347, name: 'Top K Frequent Elements', slug: 'top-k-frequent-elements', level: 'Medium', note: 'Đếm bằng bảng băm rồi lấy top K. Quay lại bài này sau khi học Heap.' },
    { no: 128, name: 'Longest Consecutive Sequence', slug: 'longest-consecutive-sequence', level: 'Medium', note: 'Dùng tập hợp để bỏ hẳn bước sắp xếp, hạ từ O(n log n) xuống O(n).' },
    { no: 560, name: 'Subarray Sum Equals K', slug: 'subarray-sum-equals-k', level: 'Medium', note: 'Bảng băm kết hợp tổng tiền tố. Đọc lại bài này khi học Tổng tiền tố ở Chương 2.' },
    { no: 146, name: 'LRU Cache', slug: 'lru-cache', level: 'Medium', note: 'Bảng băm ghép danh sách liên kết đôi. Đây đúng là phần LRU của dự án Chương 3.' },
    { no: 76, name: 'Minimum Window Substring', slug: 'minimum-window-substring', level: 'Hard', note: 'Bảng băm trong cửa sổ trượt. Để dành làm sau khi học Cửa sổ trượt.' },
  ],
}

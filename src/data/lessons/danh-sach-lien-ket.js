export default {
  goal: [
    'Giải thích được cấu tạo một nút và vì sao danh sách chỉ cần giữ con trỏ tới nút đầu.',
    'Đọc được bảng đánh đổi giữa danh sách liên kết và mảng, và nói rõ khi nào O(1) của nó thật, khi nào không.',
    'Tự cài được List<T> đơn có nút giả, cùng hai thao tác hai con trỏ: tìm nút giữa và phát hiện chu trình.',
    'Nói được vì sao mảng vẫn thắng trong nhiều tình huống thực tế dù bảng chi phí có vẻ ủng hộ danh sách liên kết.',
  ],
  examples: [
    { id: 'vd-dsll-dao-danh-sach', title: 'Đảo ngược danh sách liên kết bằng ba con trỏ, chạy tay từng bước', official: false },
    { id: 'vd-dsll-rua-tho-phat-hien-chu-trinh', title: 'Rùa và thỏ: phát hiện danh sách có chu trình', official: false },
  ],
  quiz: [
    {
      q: 'Vì sao chèn hoặc xoá ở giữa danh sách liên kết chỉ tốn O(1) khi đã cầm con trỏ tới chỗ chèn, nhưng vẫn tốn O(n) nếu chưa có con trỏ đó?',
      options: [
        'Vì sửa liên kết chỉ mất hai phép gán con trỏ, nhưng tìm ra đúng vị trí cần sửa phải đi từ đầu danh sách, tốn O(n)',
        'Vì danh sách liên kết luôn phải duyệt lại từ đầu sau mỗi lần chèn để cập nhật độ dài',
        'Vì bộ nhớ của danh sách liên kết không liên tục nên máy phải tính lại địa chỉ mọi nút',
      ],
      answer: 0,
      why: 'Bản thân việc sửa liên kết — cho nút mới trỏ tới nút sau, và nút trước trỏ tới nút mới — chỉ là vài phép gán con trỏ, không phụ thuộc n. Nhưng danh sách liên kết không có phép tính địa chỉ như mảng, nên muốn "đến" một vị trí giữa danh sách thì phải đi từng nút từ đầu, và đó mới là phần tốn O(n). Không có việc cập nhật độ dài sau mỗi lần chèn theo kiểu duyệt lại toàn bộ, và bộ nhớ không liên tục không bắt máy phải tính lại địa chỉ nút nào cả — các nút vốn đã cấp phát độc lập từ đầu.',
      },
    {
      q: 'Danh sách liên kết đôi cho phép xoá một nút với chi phí O(1) khi nào?',
      options: [
        'Khi đã cầm chính con trỏ tới nút cần xoá, vì nút đôi biết luôn nút trước của mình',
        'Luôn luôn O(1) với mọi thao tác xoá, bất kể có con trỏ tới nút đó hay không',
        'Chỉ khi nút cần xoá là nút đầu hoặc nút cuối danh sách',
      ],
      answer: 0,
      why: 'Danh sách đôi mỗi nút giữ cả con trỏ tới nút trước và nút sau, nên khi đã cầm con trỏ tới nút cần xoá, ta nối trực tiếp nút trước và nút sau của nó với nhau mà không cần đi tìm nút trước — đây chính là điều LRU cache cần, vì nó luôn cầm sẵn con trỏ tới nút vừa dùng. Không phải mọi thao tác xoá đều O(1): nếu chỉ có giá trị cần xoá mà chưa có con trỏ, vẫn phải duyệt tìm trước, tốn O(n). Và tính chất này không giới hạn ở nút đầu hoặc cuối, nó đúng cho bất kỳ nút nào miễn đã cầm con trỏ tới nó.',
    },
    {
      q: 'Nút giả (dummy node) ở đầu danh sách liên kết giúp giải quyết vấn đề gì?',
      options: [
        'Xoá đi sự khác biệt giữa trường hợp danh sách trống và trường hợp phải xoá đúng nút đầu, nhờ luôn có một nút cố định đứng trước mọi nút thật',
        'Giúp danh sách liên kết truy cập theo chỉ số với chi phí O(1) như mảng',
        'Giảm bộ nhớ vì không cần cấp phát riêng cho từng nút thật nữa',
      ],
      answer: 0,
      why: 'Không có nút giả, code luôn phải rẽ hai nhánh: "nếu danh sách trống thì..." và "nếu đang xoá đúng nút đầu thì...". Thêm một nút rỗng đứng trước nút đầu tiên khiến mọi nút thật, kể cả nút đầu, đều luôn có một nút phía trước — hai nhánh đặc biệt đó biến mất, code push_front và erase_after chạy chung một đường xử lý. Nút giả không đổi được bản chất truy cập tuần tự của danh sách liên kết, việc đó vẫn O(n). Nó cũng không giảm bộ nhớ, ngược lại còn tốn thêm đúng một nút cố định.',
    },
    {
      q: 'Hai con trỏ chạy với tốc độ một nhịp và hai nhịp trên cùng một danh sách. Nếu danh sách có chu trình, vì sao hai con trỏ chắc chắn gặp nhau?',
      options: [
        'Vì mỗi bước, khoảng cách giữa con trỏ nhanh và con trỏ chậm giảm đúng một, nên khoảng cách đó chắc chắn về 0 tại một bước nào đó trong chu trình',
        'Vì con trỏ nhanh sẽ tự động dừng lại đợi con trỏ chậm khi đi hết một vòng chu trình',
        'Vì chu trình luôn có số nút chẵn nên hai con trỏ luôn rơi vào cùng một nút',
      ],
      answer: 0,
      why: 'Một khi cả hai con trỏ đã vào trong chu trình, mỗi bước con trỏ nhanh đi 2 còn con trỏ chậm đi 1, nên khoảng cách giữa chúng — tính theo số nút trong chu trình — giảm đúng 1 mỗi bước. Một đại lượng nguyên không âm giảm đều mỗi bước thì chắc chắn chạm 0, tức hai con trỏ trùng nhau, trong tối đa đúng bằng độ dài chu trình bước. Con trỏ nhanh không có cơ chế "dừng đợi" nào, nó cứ chạy tiếp; và việc gặp nhau không phụ thuộc số nút trong chu trình là chẵn hay lẻ.',
    },
    {
      q: 'Ôn lại bài trước: chèn một phần tử vào giữa mảng một triệu phần tử tốn khoảng bao nhiêu phép dịch, và cùng việc chèn đó trên danh sách liên kết khi đã cầm con trỏ tới chỗ chèn tốn bao nhiêu bước?',
      options: [
        'Khoảng nửa triệu phép dịch trên mảng, so với đúng hai phép gán con trỏ trên danh sách liên kết',
        'Cả hai đều tốn khoảng một triệu bước, vì chèn giữa luôn là O(n) bất kể cấu trúc dữ liệu nào',
        'Mảng tốn đúng một phép dịch, danh sách liên kết tốn một triệu bước vì phải duyệt lại từ đầu',
      ],
      answer: 0,
      recall: true,
      why: 'Bài Mảng đã chỉ ra chèn giữa mảng buộc phải dịch mọi phần tử phía sau vị trí chèn sang một chỗ — với một triệu phần tử và chèn ở giữa, đó là khoảng nửa triệu phép dịch. Danh sách liên kết không cần dịch gì cả: khi đã cầm con trỏ tới đúng chỗ chèn, sửa liên kết chỉ là cho nút mới trỏ tới nút sau và nút trước trỏ tới nút mới, đúng hai phép gán con trỏ, không phụ thuộc n. Đây chính là khoảng cách O(n) so với O(1) nhìn thấy bằng số cụ thể, và cũng là lý do danh sách liên kết tồn tại như một cấu trúc riêng chứ không chỉ là "mảng nhưng chậm hơn".',
    },
  ],
  practice: [
    {
      title: 'Cài List<T> đơn có nút giả, hỗ trợ push_front, push_back, erase_after, và duyệt được bằng vòng lặp. Huỷ danh sách không được rò rỉ bộ nhớ.',
      idea: 'Giữ một nút giả cố định làm điểm bắt đầu, danh sách luôn trỏ tới nút này chứ không trỏ trực tiếp tới nút thật đầu tiên. push_front chèn ngay sau nút giả. push_back cần giữ thêm con trỏ đuôi để không phải duyệt tới cuối mỗi lần. Huỷ danh sách bằng vòng lặp giải phóng từng nút, không dùng đệ quy.',
      hint: 'Nếu push_back không giữ con trỏ đuôi mà duyệt tìm nút cuối mỗi lần, cả hàm sẽ thành O(n) và gọi n lần thành O(n²). Nhớ cập nhật con trỏ đuôi cả khi erase_after xoá đúng nút cuối, nếu không đuôi sẽ trỏ vào vùng nhớ đã giải phóng.',
    },
    {
      title: 'Cài hàm tìm nút giữa và hàm phát hiện chu trình bằng hai con trỏ, mỗi hàm chỉ đi qua danh sách đúng một lượt và không dùng thêm bộ nhớ phụ theo n.',
      idea: 'Cả hai hàm dùng chung khuôn mẫu: một con trỏ chậm đi một nhịp, một con trỏ nhanh đi hai nhịp mỗi bước lặp. Tìm nút giữa thì dừng khi con trỏ nhanh chạm cuối, con trỏ chậm đang đứng ở giữa. Phát hiện chu trình thì dừng khi hai con trỏ trùng nhau, hoặc con trỏ nhanh ra khỏi danh sách nghĩa là không có chu trình.',
      hint: 'Kiểm con trỏ nhanh có thể nhảy hai bước, nên phải kiểm nullptr ở cả bước một và bước hai của mỗi lần nhảy, không thì đọc vào vùng nhớ không hợp lệ khi danh sách có số nút lẻ.',
    },
    {
      title: 'Nạp một triệu số vào cả Vec bài trước và List bài này, rồi đo hai việc: cộng tổng toàn bộ phần tử, và chèn vào đầu một trăm nghìn lần. Giải thích vì sao mỗi cấu trúc thắng ở một việc, và vì sao khoảng cách ở việc cộng tổng lớn hơn con số Big O gợi ý.',
      idea: 'Cả hai việc đều O(n) về mặt Big O đối với mỗi cấu trúc riêng, nhưng đo thời gian thật bằng công cụ bench đã viết ở Chương 1 sẽ cho hai con số khác xa nhau. Giải thích bằng locality: Vec đọc liên tục theo khối bộ nhớ, còn List nhảy tới các nút rải rác, mỗi bước là một lần trượt cache — chi phí trượt cache không nằm trong mô hình đếm phép toán của Big O.',
      hint: 'Chèn vào đầu một trăm nghìn lần trên Vec là O(n) mỗi lần nên tổng O(n²), trong khi trên List là O(1) mỗi lần nên tổng O(n) — đây là việc List thắng rõ. Đừng ngạc nhiên nếu khoảng cách ở việc cộng tổng lớn hơn nhiều so với "cùng là O(n)" gợi ý, vì Big O không đếm chi phí trượt cache.',
    },
  ],
  leetcode: [
    { no: 206, name: 'Reverse Linked List', slug: 'reverse-linked-list', level: 'Easy', note: 'Chính là ví dụ chạy tay ba con trỏ ở bài này, viết lại thành code.' },
    { no: 21, name: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists', level: 'Easy', note: 'Ghép hai danh sách đã sắp bằng cách nối con trỏ, không cấp nút mới.' },
    { no: 141, name: 'Linked List Cycle', slug: 'linked-list-cycle', level: 'Easy', note: 'Đúng bài toán rùa và thỏ vừa học, làm lại để chắc tay.' },
    { no: 83, name: 'Remove Duplicates from Sorted List', slug: 'remove-duplicates-from-sorted-list', level: 'Easy', note: 'Luyện erase_after trên danh sách đã sắp, chú ý cập nhật liên kết đúng thứ tự.' },
    { no: 876, name: 'Middle of the Linked List', slug: 'middle-of-the-linked-list', level: 'Easy', note: 'Chính là hàm tìm nút giữa ở bài tập 2, một lượt hai con trỏ.' },
    { no: 160, name: 'Intersection of Two Linked Lists', slug: 'intersection-of-two-linked-lists', level: 'Easy', note: 'Hai con trỏ đi hết danh sách của mình rồi nhảy sang danh sách kia, gặp nhau đúng ở điểm giao.' },
    { no: 234, name: 'Palindrome Linked List', slug: 'palindrome-linked-list', level: 'Easy', note: 'Ghép tìm nút giữa với đảo ngược nửa sau — hai kỹ thuật vừa học trong một bài.' },
    { no: 92, name: 'Reverse Linked List II', slug: 'reverse-linked-list-ii', level: 'Medium', note: 'Đảo ngược một đoạn giữa danh sách, phải giữ đúng con trỏ nối vào đoạn còn lại.' },
    { no: 19, name: 'Remove Nth Node From End of List', slug: 'remove-nth-node-from-end-of-list', level: 'Medium', note: 'Hai con trỏ cách nhau n bước để tìm đúng nút cần xoá trong một lượt duyệt.' },
    { no: 146, name: 'LRU Cache', slug: 'lru-cache', level: 'Medium', note: 'Danh sách liên kết đôi ghép bảng băm. Đây đúng là xương sống của LRU cache ở MVP Chương 3.' },
    { no: 23, name: 'Merge k Sorted Lists', slug: 'merge-k-sorted-lists', level: 'Hard', note: 'Mở rộng bài ghép hai danh sách lên k danh sách, để dành làm lại sau khi học Heap.' },
  ],
  project: {
    title: 'core::List và hoàn tất thư viện core',
    why: 'Đây là mảnh cuối của thư viện nền. Sau bài này bạn có một thư viện core gồm Vec, Str, List do chính bạn viết, và đó là thứ mọi MVP từ Chương 2 tới Chương 7 liên kết vào. MVP Chương 3 dùng chính List này làm xương sống cho LRU cache.',
    input: 'Không đọc dữ liệu ngoài; dùng dữ liệu sinh sẵn để kiểm và để đo.',
    must: [
      'Cài List<T> đơn có nút giả với push_front, push_back, erase_after và duyệt được.',
      'Cài tìm nút giữa và phát hiện chu trình bằng hai con trỏ.',
      'Gộp Vec, Str, List thành thư mục core/ có Makefile chạy được bằng một lệnh và thư mục tests/ với ít nhất ba ca.',
      'Đo bằng bench của bạn, so List với Vec ở hai việc cộng tổng và chèn đầu, rồi giải thích khoảng cách ở việc cộng tổng bằng mô hình bộ nhớ và cache đã học ở bài Độ phức tạp thuật toán.',
    ],
    done: [
      'make test xanh với ba ca tối thiểu: xoá nút giữa không rò rỉ, phát hiện đúng danh sách có và không có chu trình, huỷ danh sách một triệu nút không rò rỉ.',
      'Hai đường đo List và Vec cắt nhau đúng như dự đoán: List thắng ở chèn đầu, Vec thắng ở cộng tổng.',
    ],
    traps: [
      'Quên cập nhật con trỏ đuôi khi push_back rồi push_back thành O(n).',
      'Xoá nút mà không gỡ liên kết trước, thành con trỏ treo.',
      'Huỷ danh sách bằng đệ quy rồi tràn ngăn xếp với một triệu nút.',
      'Đọc nut->sau->sau mà không kiểm nullptr.',
      'Copy List bằng copy con trỏ đầu, khiến hai danh sách chung nút và giải phóng hai lần.',
    ],
  },
}

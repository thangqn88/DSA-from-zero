export default {
  goal: [
    'Nói được sự khác nhau giữa tổ hợp và hoán vị bằng một ví dụ đời thường.',
    'Viết được khung quay lui sinh mọi tổ hợp chập k của n.',
    'Giải đúng bài Hoán vị kế tiếp trong đề, kể cả trường hợp quay vòng.',
  ],
  examples: [
    { id: 'vd-to-hop-chap-k', title: 'Tổ hợp chập k của n', official: false },
    { id: 'vd-hoan-vi-ke-tiep', title: 'Hoán vị kế tiếp (Next Permutation)', official: true },
  ],
  quiz: [
    {
      q: 'Tổ hợp và hoán vị khác nhau ở điểm cốt lõi nào?',
      options: [
        'Tổ hợp cho phép chọn lại một phần tử, hoán vị thì không',
        'Tổ hợp không quan tâm thứ tự, hoán vị thì thứ tự tạo ra kết quả khác nhau',
        'Tổ hợp chỉ dùng cho số, hoán vị chỉ dùng cho chữ',
      ],
      answer: 1,
      why: 'Chọn {1,2} hay {2,1} vẫn là cùng một nhóm trong tổ hợp — thứ tự không có tính; còn với hoán vị, đổi thứ tự là ra một kết quả khác hẳn.',
    },
    {
      q: 'Vì sao khung quay lui sinh tổ hợp không cần mảng used[] để tránh trùng?',
      options: [
        'Vì n luôn nhỏ nên trùng cũng không sao',
        'Vì luôn đi tiến — chỉ số (giá trị) chọn sau luôn lớn hơn chỉ số chọn trước',
        'Vì tổ hợp không dùng đệ quy',
      ],
      answer: 1,
      why: 'Ràng buộc backtrack(v + 1, ...) buộc lựa chọn sau luôn lớn hơn lựa chọn trước, nên không bao giờ quay lại một giá trị đã bỏ qua — tự nó đã tránh trùng.',
    },
    {
      q: 'Nếu đổi lời gọi backtrack(v + 1, count + 1) thành backtrack(v, count + 1) trong bài tổ hợp chập k, chương trình sẽ sinh ra gì?',
      options: ['Tổ hợp có lặp (một phần tử được chọn nhiều lần)', 'Hoán vị đầy đủ', 'Lỗi chạy vô hạn'],
      answer: 0,
      why: 'Cho phép gọi lại từ đúng v (không tăng lên) nghĩa là phần tử v vẫn còn được chọn ở bước sau, tức tổ hợp có lặp.',
    },
    {
      q: 'Hoán vị kế tiếp của {5, 4, 3, 2, 1} là hoán vị nào?',
      options: ['Không tồn tại', '{1, 2, 3, 4, 5}, vì đây là hoán vị lớn nhất nên quay vòng về nhỏ nhất', '{5, 4, 3, 1, 2}'],
      answer: 1,
      why: '{5,4,3,2,1} giảm dần toàn bộ nên không tìm được điểm pivot — đây đã là hoán vị lớn nhất, hoán vị kế tiếp quay vòng về hoán vị nhỏ nhất {1,2,3,4,5}.',
    },
  ],
  practice: [
    {
      title: 'Sinh mọi tổ hợp chập k của n, cho phép chọn lại một phần tử (tổ hợp có lặp).',
      idea: 'Điều duy nhất ngăn một số được chọn lại là ràng buộc "phần tử sau phải lớn hơn nghiêm ngặt phần tử trước" — nới lỏng đúng một chữ (từ "lớn hơn" thành "lớn hơn hoặc bằng") là cho phép chọn lại.',
      hint: 'Đổi backtrack(v + 1, count + 1) thành backtrack(v, count + 1), giữ nguyên toàn bộ phần còn lại của khung quay lui.',
    },
    {
      title: 'Sinh mọi hoán vị của một mảng có phần tử trùng nhau, không in trùng kết quả.',
      idea: 'Khung hoán vị chuẩn (dùng mảng used[]) sẽ in trùng nếu mảng gốc có phần tử giống nhau, vì máy tính không phân biệt được hai số 2 giống nhau ở vị trí khác nhau.',
      hint: 'Sắp xếp mảng trước, rồi ở mỗi bước chỉ chọn một phần tử trong các phần tử giống nhau còn lại — bỏ qua v nếu a[v] == a[v-1] và a[v-1] chưa dùng trong lượt hiện tại.',
    },
    {
      title: 'Sinh mọi tập con của {1..n} bằng bitmask thay cho đệ quy.',
      idea: 'Một tập con của n phần tử ứng với đúng một số nguyên từ 0 đến 2ⁿ − 1, trong đó bit thứ i bật nghĩa là phần tử i được chọn — không cần quay lui, chỉ cần duyệt số và đọc bit.',
      hint: 'Chạy vòng lặp mask từ 0 tới (1 << n) - 1; với mỗi mask, in ra các i mà (mask >> i) & 1 == 1.',
    },
  ],
  leetcode: [
    { no: 118, name: 'Pascal Triangle', slug: 'pascals-triangle', level: 'Easy', note: 'Thấy công thức C(n,k) hình thành theo từng hàng.' },
    { no: 119, name: 'Pascal Triangle II', slug: 'pascals-triangle-ii', level: 'Easy', note: 'Tính 1 hàng bằng O(k) bộ nhớ.' },
    { no: 77, name: 'Combinations', slug: 'combinations', level: 'Medium', note: 'Đúng bài ví dụ 1, không đổi gì.' },
    { no: 216, name: 'Combination Sum III', slug: 'combination-sum-iii', level: 'Medium', note: 'Tổ hợp có thêm ràng buộc tổng.' },
    { no: 40, name: 'Combination Sum II', slug: 'combination-sum-ii', level: 'Medium', note: 'Học cách bỏ nghiệm trùng khi đầu vào có số lặp.' },
    { no: 46, name: 'Permutations', slug: 'permutations', level: 'Medium', note: 'Chuyển từ tổ hợp sang hoán vị bằng mảng used[].' },
    { no: 47, name: 'Permutations II', slug: 'permutations-ii', level: 'Medium', note: 'Hoán vị khi mảng có phần tử trùng — đúng bài tập 2.' },
    { no: 31, name: 'Next Permutation', slug: 'next-permutation', level: 'Medium', note: 'Chính là bài trong đề ôn tập.' },
    { no: 60, name: 'Permutation Sequence', slug: 'permutation-sequence', level: 'Hard', note: 'Tìm hoán vị thứ k mà không sinh hết.' },
    { no: 1830, name: 'Make String Sorted', slug: 'minimum-number-of-operations-to-make-string-sorted', level: 'Hard', note: 'Đếm thứ hạng của một hoán vị.' },
  ],
}

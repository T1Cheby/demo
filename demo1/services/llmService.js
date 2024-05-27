

// exports.convertDoc = (file) => {

// }

// 1
// Model I / O: là thành phần nền tảng để giao tiếp với các language model.
// Module này cung cấp giao diện để thực hiện tương tác liền mạch với bất kì language model nào.

// 2
// Retrieval: là thành phần giúp tạo điều kiện thuận lợi cho việc tích hợp dữ liệu chuyên biệt của người dùng vào giai đoạn generation của language model bằng cách sử dụng Retrieval Augmented Generation(RAG).
// Langchain hỗ trợ các chức năng như document loaders, document transformers, text embedding models và nhiều thuật toán truy xuất cũng như cách lưu trữ dữ liệu dưới dạng vector, đảm bảo việc sử dụng dữ liệu hiệu quả và phù hợp ngữ cảnh.

// 3
// Chains: là thành phần giúp thiết kế những xử lí phức tạp bằng cách kết nối các LLM với nhau hoặc với các thành phần khác, bao gồm các chuỗi khác.Cách tiếp cận này vừa đơn giản vừa hiệu quả, giúp phát triển các ứng dụng phức tạp, nâng cao khả năng bảo trì.
// Một minh họa chuỗi đơn giản như: chuỗi lấy thông tin đầu vào của người dùng, chuyển thành định dạng của PromptTemplate, chuyển đến xử lý với LLM, và tổng hợp lại kết quả.
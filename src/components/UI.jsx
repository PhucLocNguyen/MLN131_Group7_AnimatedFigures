import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const pictures = [
  {
    name: "DSC00680",
    title: "Buổi sớm bình yên",
    description:
      "Ánh sáng đầu ngày nhẹ nhàng chạm vào mặt đất, khơi dậy cảm giác yên bình và trong trẻo. Một khoảnh khắc tĩnh lặng giữa sự vội vã của cuộc sống.",
  },
  {
    name: "DSC00933",
    title: "Dòng sông mùa hạ",
    description:
      "Mặt nước long lanh phản chiếu những tán cây xanh rì, tiếng côn trùng râm ran như khúc nhạc của thiên nhiên.",
  },
  {
    name: "DSC00966",
    title: "Thị trấn ngủ quên",
    description:
      "Một góc nhỏ của thị trấn nằm im lìm dưới ánh chiều tà, thời gian như ngừng lại nơi đây.",
  },
  {
    name: "DSC00983",
    title: "Những bậc thang lên mây",
    description:
      "Ruộng bậc thang trải dài như nấc thang dẫn đến trời xanh, nơi con người và thiên nhiên hòa làm một.",
  },
  {
    name: "DSC01011",
    title: "Lối nhỏ trong rừng",
    description:
      "Ánh nắng lấp ló qua tán lá, chiếu xuống con đường mòn đầy lá rụng, dẫn ta vào thế giới của bình yên.",
  },
  {
    name: "DSC01040",
    title: "Tiếng gió qua đồi",
    description:
      "Đồi cỏ trải dài, gió thổi vi vu như bản hòa tấu không lời của tự nhiên.",
  },
  {
    name: "DSC01064",
    title: "Cơn mưa đầu mùa",
    description:
      "Những giọt mưa đầu tiên rơi trên mái ngói, gợi lại bao ký ức tuổi thơ dịu dàng.",
  },
  {
    name: "DSC01071",
    title: "Hàng cây bên suối",
    description:
      "Tiếng nước chảy róc rách hòa cùng bóng cây đung đưa, một khung cảnh bình yên đến lạ.",
  },
  {
    name: "DSC01103",
    title: "Thành phố thức giấc",
    description:
      "Ánh đèn vụt tắt, mặt trời lên. Thành phố bắt đầu ngày mới đầy năng lượng và hi vọng.",
  },
  {
    name: "DSC01145",
    title: "Mùa hoa nở rộ",
    description:
      "Sắc hoa lan tỏa khắp không gian, như lời chào nồng ấm của thiên nhiên dành cho con người.",
  },
  {
    name: "DSC01420",
    title: "Buổi chiều trên đồng cỏ",
    description:
      "Những cánh đồng cỏ đong đưa trong gió, ánh mặt trời chiếu vàng rực rỡ như tấm lụa khổng lồ.",
  },
  {
    name: "DSC01461",
    title: "Bước chân lữ khách",
    description:
      "Con đường dài, lữ khách đơn độc đi giữa những rặng cây khô. Hành trình mới lại bắt đầu.",
  },
  {
    name: "DSC01489",
    title: "Góc phố cũ",
    description:
      "Bức tường loang lổ, bảng hiệu phai màu, nhưng chứa đựng biết bao kỷ niệm của một thời đã qua.",
  },
  {
    name: "DSC02031",
    title: "Đêm trăng ven biển",
    description:
      "Ánh trăng phản chiếu lên mặt biển, gió thổi khẽ và sóng vỗ rì rào. Một đêm yên ả nơi miền xa.",
  },
  {
    name: "DSC02064",
    title: "Ánh sáng và bóng tối",
    description:
      "Sự tương phản giữa ánh sáng và bóng tối, giữa ồn ào và tĩnh lặng – như hai mặt của cuộc sống.",
  },
  {
    name: "DSC02069",
    title: "Khoảnh khắc cuối cùng",
    description:
      "Khi mặt trời khuất bóng, thế giới chìm trong sắc tím nhạt – một vẻ đẹp ngắn ngủi nhưng sâu lắng.",
  },
];

export const pageAtom = atom(0);

// 🖼️ Tạo các trang theo cặp (front/back) từ mảng trên
export const pages = [
  {
    front: "book-cover",
    back: pictures[0].name,
    title: "Trang Bìa",
    description: "Khởi đầu cho hành trình qua ống kính và cảm xúc.",
  },
];

// Ghép ảnh 2–2 thành từng trang
for (let i = 0; i < pictures.length - 1; i += 2) {
  const front = pictures[i];
  const back = pictures[i + 1];
  pages.push({
    front: front.name,
    back: back.name,
    title: front.title,
    description: front.description + "\n\n" + back.description,
  });
}

// Trang cuối
pages.push({
  front: pictures[pictures.length - 1].name,
  back: "book-back",
  title: "Trang Kết",
  description:
    "Kết thúc hành trình của cuốn sách ảnh – nơi cảm xúc lắng đọng lại trong từng khung hình.",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return (
    <>
      {/* 🔹 Điều hướng trang */}
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        <a className="pointer-events-auto mt-10 ml-10" href="#">
          <img className="w-20" src="/images/wawasensei-white.png" />
        </a>

        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      {/* 🔸 Mô tả bên trái */}
      <div className="fixed left-0 top-0 h-full w-[35%] bg-gradient-to-r from-black/80 to-transparent text-white flex flex-col justify-center p-10 z-[5] pointer-events-none">
        <div className="max-w-md space-y-4">
          <h1 className="text-5xl font-extrabold leading-tight drop-shadow-lg">
            {pages[page]?.title}
          </h1>
          <p className="text-lg leading-relaxed opacity-90 whitespace-pre-line">
            {pages[page]?.description}
          </p>
        </div>
      </div>

      {/* 💡 Chữ chạy ngang phía dưới */}
      <div className="fixed inset-0 flex items-center -rotate-2 select-none pointer-events-none hidden">
        <div className="relative">
          <div className="bg-white/0 animate-horizontal-scroll flex items-center gap-8 w-max px-8">
            <h1 className="shrink-0 text-white text-10xl font-black">
              Wawa Sensei
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              React Three Fiber
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">Three.js</h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Ultimate Guide
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              Tutorials
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              Learn
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">
              Practice
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Creative
            </h2>
          </div>

          <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
            <h1 className="shrink-0 text-white text-10xl font-black">
              Wawa Sensei
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              React Three Fiber
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">Three.js</h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Ultimate Guide
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              Tutorials
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              Learn
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">
              Practice
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Creative
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

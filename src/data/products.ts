export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: 'აუდიო' | 'გაჯეტები' | 'კომპიუტერები' | 'ფოტო';
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  stock: number;
  vendorEmail: string;
  badge?: string;
  featured?: boolean;
}

export const initialProducts: Product[] = [
  { id: 'studio-headphones', name: 'Studio Pro', subtitle: 'უსადენო ყურსასმენი', description: 'სუფთა ხმა, აქტიური ხმაურის ჩახშობა და კომფორტული დიზაინი ყოველდღიური გამოყენებისთვის.', category: 'აუდიო', price: 349, oldPrice: 429, image: '/products/headphones.svg', rating: 4.9, stock: 14, vendorEmail: 'audio@vela.ge', badge: 'ბესტსელერი', featured: true },
  { id: 'orbit-speaker', name: 'Orbit Mini', subtitle: 'პორტატული დინამიკი', description: 'კომპაქტური Bluetooth დინამიკი მდიდარი ბასითა და თანამედროვე ფორმით.', category: 'აუდიო', price: 189, image: '/products/speaker.svg', rating: 4.8, stock: 24, vendorEmail: 'audio@vela.ge', badge: 'ახალი', featured: true },
  { id: 'nova-watch', name: 'Nova Watch', subtitle: 'ჭკვიანი საათი', description: 'აქტივობის მონიტორინგი, შეტყობინებები და ელეგანტური დიზაინი ერთ მოწყობილობაში.', category: 'გაჯეტები', price: 459, oldPrice: 519, image: '/products/watch.svg', rating: 4.8, stock: 11, vendorEmail: 'smart@vela.ge', featured: true },
  { id: 'pix-camera', name: 'Pix One', subtitle: 'ციფრული კამერა', description: 'მაღალი დეტალიზაცია და მარტივი მართვა შთამბეჭდავი კადრების გადასაღებად.', category: 'ფოტო', price: 1299, image: '/products/camera.svg', rating: 4.9, stock: 8, vendorEmail: 'photo@vela.ge', badge: 'რჩეული' },
  { id: 'air-laptop', name: 'AirBook 14', subtitle: 'მსუბუქი ლეპტოპი', description: 'მძლავრი, თხელი ლეპტოპი სტუდენტებისა და შემოქმედებითი ადამიანებისთვის.', category: 'კომპიუტერები', price: 2499, oldPrice: 2799, image: '/products/laptop.svg', rating: 4.9, stock: 6, vendorEmail: 'tech@vela.ge' },
  { id: 'arc-mouse', name: 'Arc Mouse', subtitle: 'ერგონომიული მაუსი', description: 'ზუსტი კონტროლი, უკაბელო კავშირი და კომფორტი სამუშაო პროცესში.', category: 'კომპიუტერები', price: 99, image: '/products/mouse.svg', rating: 4.7, stock: 32, vendorEmail: 'tech@vela.ge' },
  { id: 'flow-phone', name: 'Flow X', subtitle: 'სმარტფონი', description: 'სწრაფი მუშაობა, გამორჩეული კამერა და ნათელი ეკრანი.', category: 'გაჯეტები', price: 1899, image: '/products/phone.svg', rating: 4.8, stock: 9, vendorEmail: 'smart@vela.ge' },
  { id: 'vision-display', name: 'Vision 27', subtitle: '27-ინჩიანი მონიტორი', description: 'ზუსტი ფერები, მაღალი გარჩევადობა და მინიმალისტური დიზაინი.', category: 'კომპიუტერები', price: 829, image: '/products/monitor.svg', rating: 4.7, stock: 12, vendorEmail: 'tech@vela.ge' }
];
export const categories = ['ყველა', 'აუდიო', 'გაჯეტები', 'კომპიუტერები', 'ფოტო'] as const;
export const money = (value: number) => new Intl.NumberFormat('ka-GE', { maximumFractionDigits: 0 }).format(value) + ' ₾';

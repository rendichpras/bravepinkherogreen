import React, { useState } from 'react';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function SocialTrendInfo() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className="w-full max-w-4xl">
      <Card className="bg-gradient-to-br from-card to-card/95 border-border shadow-lg overflow-hidden">
        <CardHeader className="pb-4">
          {/* Header 17+8 */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center bg-brave-pink/10 rounded-lg px-4 py-2 mb-4">
              <span className="text-brave-pink font-bold text-xl">17+8</span>
            </div>
            <CardTitle className="text-lg sm:text-xl text-card-foreground mb-3 font-bold">
              Apa itu 17+8?
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              17+8 adalah daftar tuntutan rakyat kepada pemerintah yang viral di media sosial. 
              Terdiri dari <span className="font-semibold text-brave-pink">17 tuntutan jangka pendek</span> (tenggat 5 September 2025) dan <span className="font-semibold text-hero-green">8 tuntutan jangka panjang</span> (tenggat 31 Agustus 2026) 
              yang merangkum aspirasi dari berbagai aksi demonstrasi di Indonesia.
            </CardDescription>
          </div>
          
          {/* Informasi Warna */}
          <div className="mt-6 pt-6 border-t border-gradient-to-r from-brave-pink/20 via-hero-green/20 to-[#0038A8]/20">
            <div className="bg-gradient-to-r from-brave-pink/5 to-hero-green/5 rounded-xl p-3 sm:p-4">
              <div>
                <h3 className="text-sm font-semibold text-card-foreground mb-3 text-center">Makna Warna Simbolis</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-white/50 rounded-lg p-2 sm:p-3 border border-brave-pink/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block w-4 h-4 rounded-full bg-brave-pink" aria-hidden="true"></span>
                        <span className="font-semibold text-brave-pink text-sm">Brave Pink</span>
                      </div>
                      <p className="text-xs text-card-foreground leading-relaxed">
                        Terinspirasi dari Ibu Ana, seorang ibu berjilbab merah muda yang berani berdiri di depan barikade polisi saat demonstrasi 28 Agustus 2025.
                      </p>
                    </div>
                    
                    <div className="bg-white/50 rounded-lg p-3 border border-hero-green/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block w-4 h-4 rounded-full bg-hero-green" aria-hidden="true"></span>
                        <span className="font-semibold text-hero-green text-sm">Hero Green</span>
                      </div>
                      <p className="text-xs text-card-foreground leading-relaxed">
                        Menghormati memori Affan Kurniawan, seorang driver ojek online yang meninggal dilindas kendaraan taktis Brimob saat unjuk rasa.
                      </p>
                    </div>
                    
                    <div className="bg-white/50 rounded-lg p-3 border border-[#0038A8]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: "#0038A8" }} aria-hidden="true"></span>
                        <span className="font-semibold text-sm" style={{ color: "#0038A8" }}>Resistance Blue</span>
                      </div>
                      <p className="text-xs text-card-foreground leading-relaxed">
                        Merujuk pada simbol Protes &quot;Peringatan Darurat Demokrasi&quot; yang muncul sejak pertengahan 2024.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-xs text-muted-foreground italic">
                      Ketiga warna ini menjadi simbol perjuangan dan keberanian masyarakat Indonesia dalam menyampaikan aspirasi.
            </p>
            <a 
                      href="https://tirto.id/asal-usul-brave-pink-hero-green-resistance-blue-yang-viral-hg6y?__cf_chl_tk=g3Ba3iyBjbt3s5qXMDfFRxGRC9rfZTLB.Oy2tN5gc_A-1756889696-1.0.1.1-._iy9eD9TuJyaaH7jJgy1VZL63j0zjd2uXUUMj8viwY" 
              target="_blank" 
              rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-brave-pink hover:text-brave-pink/80 text-xs font-medium mt-2 transition-colors"
                      aria-label="Pelajari lebih lanjut tentang warna Brave Pink, Hero Green, dan Resistance Blue"
            >
              Pelajari lebih lanjut
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7"></path>
                        <path d="M7 7h10v10"></path>
                      </svg>
                    </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-brave-pink/5 to-hero-green/5 rounded-xl p-3 sm:p-4">
              <button
                onClick={toggleExpand}
                className="w-full flex items-center justify-between cursor-pointer font-medium text-gray-700 hover:text-brave-pink transition-all duration-200 group p-3 -m-3 rounded-lg hover:bg-brave-pink/5"
              >
                <span className="text-sm sm:text-base">
                  {isExpanded ? 'Sembunyikan detail 17+8' : 'Lihat detail lengkap 17+8'}
                </span>
                <div className="flex items-center gap-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className={`transition-transform duration-200 group-hover:scale-110 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>
            </div>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 text-sm">
                  <div className="bg-white/60 rounded-lg p-3 sm:p-4 border border-gray-200">
                    <p className="text-card-foreground leading-relaxed">
                      Fenomena unggahan 17+8 tuntutan yang viral merupakan rangkuman tuntutan masyarakat dari serangkaian 
                      aksi demonstrasi yang merebak di berbagai daerah Indonesia. Mulai dari aksi buruh pada 28 Agustus 2025, 
                      hingga aksi terbaru yang menagih akuntabilitas Polri terkait kematian Affan serta soal kenaikan 
                      tunjangan anggota DPR RI.
                    </p>
                  </div>
                  
                  <div className="bg-white/60 rounded-lg p-3 sm:p-4 border border-gray-200">
                    <p className="text-card-foreground leading-relaxed">
                      Sejumlah tokoh publik seperti aktivis Andhyta Firselly Utami (Afu) hingga influencer Jerome Polin 
                      menjadi beberapa orang yang turut merangkum tuntutan-tuntutan tersebut ke dalam 17+8 poin. 
                      Jerome menegaskan bahwa daftar ini bukan milik satu kelompok saja, melainkan suara gabungan rakyat Indonesia.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-brave-pink/10 to-hero-green/10 border-l-4 border-brave-pink rounded-r-lg p-4">
                    <div className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brave-pink flex-shrink-0 mt-0.5">
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1 0 1-1 2-2 2s-1.008-.5-1-1.5c0-2 1.5-3 3-3s3 1 3 3c0 1.5-1 2.5-2 2.5z"></path>
                      </svg>
                      <p className="text-card-foreground italic leading-relaxed">
                        &ldquo;Ini adalah tuntutan dari kami semua, rakyat Indonesia. Sudah dirangkum dan didetailkan 17 tuntutan jangka pendek 
                        dan 8 tuntutan jangka panjang lengkap dengan deadlinenya. Kami menunggu. Buktikan suara rakyat didengar.&rdquo;
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-brave-pink/10 to-brave-pink/5 rounded-lg p-3 sm:p-4 border border-brave-pink/20">
                      <h4 className="font-bold text-brave-pink text-sm mb-3 flex items-center gap-2">
                        <span className="bg-brave-pink text-white text-xs px-2 py-1 rounded-full">17</span>
                        17 Tuntutan Jangka Pendek (tenggat 5 September 2025)
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="bg-white/60 rounded-lg p-2 sm:p-3">
                          <h5 className="font-semibold text-card-foreground text-xs mb-2">Tugas Presiden RI Prabowo Subianto:</h5>
                          <ol className="list-decimal pl-4 space-y-1 text-xs text-card-foreground">
                            <li>Tarik TNI dari pengamanan sipil dan pastikan tidak ada kriminalisasi demonstran.</li>
                            <li>Bentuk Tim Investigasi Independen kasus Affan Kurniawan, Umar Amarudin, maupun semua korban kekerasan aparat.</li>
                          </ol>
                        </div>
                        
                        <div className="bg-white/60 rounded-lg p-2 sm:p-3">
                          <h5 className="font-semibold text-card-foreground text-xs mb-2">Tugas DPR RI:</h5>
                          <ol className="list-decimal pl-4 space-y-1 text-xs text-card-foreground" start={3}>
                            <li>Bekukan kenaikan gaji/tunjangan anggota DPR dan batalkan fasilitas baru, termasuk pensiun.</li>
                            <li>Publikasikan transparansi anggaran terkait gaji, tunjangan, rumah, dan fasilitas DPR.</li>
                            <li>Dorong Badan Kehormatan DPR untuk memeriksa anggota yang bermasalah.</li>
                          </ol>
                        </div>
                        
                        <div className="bg-white/60 rounded-lg p-2 sm:p-3">
                          <h5 className="font-semibold text-card-foreground text-xs mb-2">Tugas ketua umum partai politik:</h5>
                          <ol className="list-decimal pl-4 space-y-1 text-xs text-card-foreground" start={6}>
                            <li>Pecat atau jatuhkan sanksi tegas pada kader DPR yang tidak etis.</li>
                            <li>Umumkan komitmen partai untuk berpihak pada rakyat di tengah krisis.</li>
                            <li>Libatkan kader dalam ruang dialog publik bersama mahasiswa serta masyarakat sipil.</li>
                          </ol>
                        </div>
                        
                        <div className="bg-white/60 rounded-lg p-2 sm:p-3">
                          <h5 className="font-semibold text-card-foreground text-xs mb-2">Tugas Polri:</h5>
                          <ol className="list-decimal pl-4 space-y-1 text-xs text-card-foreground" start={9}>
                            <li>Bebaskan seluruh demonstran yang ditahan.</li>
                            <li>Hentikan kekerasan polisi dan taati SOP pengendalian massa.</li>
                            <li>Tangkap dan proses hukum secara transparan anggota dan komandan yang melakukan kekerasan.</li>
                          </ol>
                        </div>
                        
                        <div className="bg-white/60 rounded-lg p-2 sm:p-3">
                          <h5 className="font-semibold text-card-foreground text-xs mb-2">Tugas TNI:</h5>
                          <ol className="list-decimal pl-4 space-y-1 text-xs text-card-foreground" start={12}>
                            <li>Segera kembali ke barak, hentikan keterlibatan dalam pengamanan sipil.</li>
                            <li>Tegakkan disiplin internal agar anggota TNI tidak mengambil alih fungsi Polri.</li>
                            <li>Komitmen publik TNI untuk tidak memasuki ruang sipil selama krisis demokrasi.</li>
                          </ol>
                        </div>
                        
                        <div className="bg-white/60 rounded-lg p-2 sm:p-3">
                          <h5 className="font-semibold text-card-foreground text-xs mb-2">Tugas Kementerian Ekonomi:</h5>
                          <ol className="list-decimal pl-4 space-y-1 text-xs text-card-foreground" start={15}>
                            <li>Pastikan upah layak untuk seluruh angkatan kerja di seluruh Indonesia.</li>
                            <li>Ambil langkah darurat untuk mencegah PHK massal dan lindungi buruh kontrak.</li>
                            <li>Buka dialog dengan serikat buruh untuk solusi upah minimum dan outsourcing.</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  
                    <div className="bg-gradient-to-r from-hero-green/10 to-hero-green/5 rounded-lg p-3 sm:p-4 border border-hero-green/20">
                      <h4 className="font-bold text-hero-green text-sm mb-3 flex items-center gap-2">
                        <span className="bg-hero-green text-white text-xs px-2 py-1 rounded-full">8</span>
                        8 Tuntutan Jangka Panjang (tenggat 31 Agustus 2026)
                      </h4>
                      <div className="bg-white/60 rounded-lg p-3">
                        <ol className="list-decimal pl-4 space-y-1 text-xs text-card-foreground">
                          <li>Bersihkan dan reformasi DPR besar-besaran</li>
                          <li>Reformasi partai politik dan kuatkan pengawasan eksekutif</li>
                          <li>Susun rencana reformasi perpajakan yang lebih adil</li>
                          <li>Sahkan dan tegakkan UU Perampasan Aset Koruptor</li>
                          <li>Reformasi kepemimpinan dan sistem di kepolisian agar profesional dan humanis</li>
                          <li>TNI kembali ke barak tanpa pengecualian</li>
                          <li>Perkuat Komnas HAM dan lembaga pengawas independen</li>
                          <li>Tinjau ulang kebijakan sektor ekonomi dan ketenagakerjaan</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  
                                      <div className="bg-gradient-to-r from-[#0038A8]/10 to-[#0038A8]/5 rounded-lg p-3 sm:p-4 border border-[#0038A8]/20">
                    <h4 className="font-bold text-[#0038A8] text-sm mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0038A8]">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      Perkembangan Terkini
                    </h4>
                    <div className="bg-white/60 rounded-lg p-3">
                      <p className="text-xs text-card-foreground leading-relaxed">
                        Per 2 September 2025, dua dari 17+8 tuntutan seperti pembatalan pemberian tunjangan pada anggota DPR RI 
                        mulai berbuah hasil. Presiden RI Prabowo Subianto telah memandatkan pencabutan tunjangan anggota DPR RI 
                        kepada para ketua partai.
                      </p>
                      <p className="text-xs text-card-foreground leading-relaxed mt-2">
                        Selain itu, setidaknya lima anggota DPR RI yang belakangan memicu kemarahan publik telah dinonatifkan sementara.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Sumber:</span>
                      <a 
                        href="https://www.detik.com/jabar/berita/d-8092490/apa-itu-17-8-tuntutan-rakyat-yang-ramai-di-medsos-dan-maknanya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brave-pink hover:text-brave-pink/80 text-xs font-medium transition-colors"
                      >
                        detik.com
                      </a>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

import {
  Fish,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
} from "lucide-react";
import { Instagram, Youtube } from "./BrandIcons";

export default function Footer() {
  const waUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`;

  return (
    <footer id="footer" className="bg-dark text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <Fish size={18} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Bibit Lele Unggul
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              Supplier bibit lele terpercaya di Palembang. Melayani petambak
              rumahan hingga skala menengah di seluruh Sumatera.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Youtube size={16} />
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-white/80 uppercase tracking-wide">
              Menu
            </h4>
            <ul className="space-y-2 text-sm text-white/50">
              {[
                ["Beranda", "#hero"],
                ["Tentang Kami", "#tentang"],
                ["Produk", "#produk"],
                ["Cara Order", "#cara-order"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="hover:text-primary transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-white/80 uppercase tracking-wide">
              Kontak & Lokasi
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex gap-2 items-start">
                <MapPin
                  size={15}
                  className="text-primary shrink-0 mt-0.5"
                />
                <span>
                  Jl. Pulokerto RT 21 RW 04, Kec. Gandus,
                  <br />
                  Kel. Pulokerto, Palembang
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone
                  size={15}
                  className="text-primary shrink-0"
                />
                <a href={waUrl} className="hover:text-white transition-colors">
                  +62 857-8837-3781
                </a>
              </li>
              <li className="flex gap-2 items-center">
                <Clock
                  size={15}
                  className="text-primary shrink-0"
                />
                <span>Senin – Sabtu, 07.00 – 17.00</span>
              </li>
            </ul>

            {/* Google Maps Embed */}
            <div className="mt-4 rounded-xl overflow-hidden h-32 border border-white/10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d127500.83623887521!2d104.6683240130133!3d-2.9860506504449043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sLokasi%20Jl.%20Pulokerto%20RT%2021%20RW%2004%20Kec.Gandus%20Kel.%20Pulokerto%20Palembang!5e0!3m2!1sen!2sid!4v1774880832275!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <span>© 2025 Bibit Lele Unggul. All rights reserved.</span>
          <span>Made with 🐟 in Palembang</span>
        </div>
      </div>
    </footer>
  );
}

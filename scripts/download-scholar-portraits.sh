#!/usr/bin/env bash
# Downloads scholar portrait images from Wikimedia Commons (public domain / CC).
set -euo pipefail

OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/src/assets/scholars/portraits"
mkdir -p "$OUT_DIR"

download() {
  local slug="$1"
  local file="$2"
  local ext="${3:-jpg}"
  local url="https://commons.wikimedia.org/wiki/Special:FilePath/${file}"
  local dest="${OUT_DIR}/${slug}.${ext}"
  echo "→ ${slug}"
  if curl -fsSL "$url" -o "$dest" && file "$dest" | grep -qiE 'image|JPEG|PNG|WebP'; then
    echo "  ✓ $(basename "$dest")"
  else
    echo "  ✗ failed: ${file}" >&2
    rm -f "$dest"
    return 1
  fi
}

# slug | Wikimedia filename | extension
download al-fazari "Arabic_astrolabe_13th_century.jpg"
download al-farghani "Alfraganus_-_Elements_of_astronomy_on_the_sphere.png" png
download al-battani "Al-Battani.jpg"
download abd-al-rahman-al-sufi "Andromeda_Galaxy_(al-Sufi).jpg"
download ibn-yunus "Astronomical_tables_of_Ibn_Yunus.jpg"
download al-zarqali "Arzachel.jpg"
download nasir-al-din-al-tusi "Nasir_al-Din_al-Tusi.jpg"
download ibn-al-shatir "Ibn_al-Shatir_lunar_model.jpg"
download ulugh-beg "Ulugh_Beg.jpg"
download ali-qushji "Ali_Qushji.jpg"

download al-khwarizmi "Al-Khwarizmi_portrait.jpg"
download thabit-ibn-qurra "Thabit_ibn_Qurra.jpg"
download abu-al-wafa-al-buzjani "Abu%27l-Wafa%27_Iranian_Baghdad_Iraq.jpg"
download abu-nasr-mansur "Abu_Nasr_Mansur.jpg"
download omar-khayyam "Omar_Khayyam_-_Hayyami.jpg"
download sharaf-al-din-al-tusi "Sharaf_al-Din_al-Tusi.jpg"
download jamshid-al-kashi "Jamshid_al-Kashi.jpg"

download al-razi "Abu_Bakr_Mohammad_ibn_Zakariya_al-Razi_(Rhazes).jpg"
download ali-ibn-sahl-rabban-al-tabari "Firdous_al-Hikmah.jpg"
download al-zahrawi "Al-Zahrawi.jpg"
download ibn-sina-medicine "Ibn_Sina_(Avicenna)_;_portrait_painting.jpg"
download ibn-zuhr "Ibn_Zuhr.jpg"
download ibn-al-nafis "Ibn_al-Nafis.jpg"
download al-biruni-medicine "Al-Biruni.jpg"

download al-kindi "Al-Kindi.png" png
download al-farabi "Al-Farabi.jpg"
download ibn-sina-philosophy "Avicenna_Portrait_on_Silver_Vase_-_Museum_at_BuAli_Sina_(Avicenna)_Mausoleum_-_Hamadan_-_Western_Iran.jpg"
download al-ghazali "Al-Ghazali.png" png
download ibn-bajjah "Avempace.jpg"
download ibn-tufayl "Ibn_Tufail_Andalusi_rabbit.jpg"
download ibn-rushd "AverroesColor.jpg"

download banu-musa-brothers "Banu_Musa_brothers_automata.jpg"
download al-jazari "Al-Jazari_Elephant_Clock.jpg"
download abbas-ibn-firnas "Abbas_Ibn_Firnas.jpg"
download taqi-al-din "Taqi_ad-Din_Muhammad_ibn_Ma%27ruf.jpg"

download al-biruni-geography "Biruni_1973_NASA_6.jpg"
download al-idrisi "Tabula_Rogeriana.jpg"
download al-maqdisi "Palestine_in_the_time_of_the_Crusades,_1187.jpg"
download abu-zayd-al-balkhi "Suwar_al-aqalim.jpg"
download ibn-battuta "Ibn_Battuta.jpg"

echo ""
echo "Done. Portraits saved to ${OUT_DIR}"

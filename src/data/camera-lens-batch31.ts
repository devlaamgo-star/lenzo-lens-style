// Camera-only import of 31 finished product photos (manifest: catalog-templates/camera-lens-skins/imports/camera31).
// Each supplied WebP is one product; slugs and filenames are the duplicate-prevention keys.
import type { Lang } from "./products";

import img_01_dreamy_puppy from "@/assets/lens/camera31/01-dreamy-puppy.webp.asset.json";
import img_02_cosmic_explorer from "@/assets/lens/camera31/02-cosmic-explorer.webp.asset.json";
import img_03_capybara_afterhours from "@/assets/lens/camera31/03-capybara-afterhours.webp.asset.json";
import img_04_little_reaper from "@/assets/lens/camera31/04-little-reaper.webp.asset.json";
import img_05_chibi_gundam from "@/assets/lens/camera31/05-chibi-gundam.webp.asset.json";
import img_06_crystal_bunny from "@/assets/lens/camera31/06-crystal-bunny.webp.asset.json";
import img_07_orbit_bandit from "@/assets/lens/camera31/07-orbit-bandit.webp.asset.json";
import img_08_doraemon_sky_dream from "@/assets/lens/camera31/08-doraemon-sky-dream.webp.asset.json";
import img_09_doraemon_pink_door from "@/assets/lens/camera31/09-doraemon-pink-door.webp.asset.json";
import img_10_atay_cat from "@/assets/lens/camera31/10-atay-cat.webp.asset.json";
import img_11_funny_duck from "@/assets/lens/camera31/11-funny-duck.webp.asset.json";
import img_12_tom_cool_vibes from "@/assets/lens/camera31/12-tom-cool-vibes.webp.asset.json";
import img_13_matcha_dragon from "@/assets/lens/camera31/13-matcha-dragon.webp.asset.json";
import img_14_astral_koi from "@/assets/lens/camera31/14-astral-koi.webp.asset.json";
import img_15_ramen_ronin from "@/assets/lens/camera31/15-ramen-ronin.webp.asset.json";
import img_16_kickflip_frog from "@/assets/lens/camera31/16-kickflip-frog.webp.asset.json";
import img_17_cosmic_black_cat from "@/assets/lens/camera31/17-cosmic-black-cat.webp.asset.json";
import img_18_neon_kitsune from "@/assets/lens/camera31/18-neon-kitsune.webp.asset.json";
import img_19_rainy_day_duo from "@/assets/lens/camera31/19-rainy-day-duo.webp.asset.json";
import img_20_shin_chan_shiro_nap from "@/assets/lens/camera31/20-shin-chan-shiro-nap.webp.asset.json";
import img_21_shin_chan_chill_beats from "@/assets/lens/camera31/21-shin-chan-chill-beats.webp.asset.json";
import img_22_shin_chan_midnight from "@/assets/lens/camera31/22-shin-chan-midnight.webp.asset.json";
import img_23_ghost_espresso from "@/assets/lens/camera31/23-ghost-espresso.webp.asset.json";
import img_24_midnight_cat from "@/assets/lens/camera31/24-midnight-cat.webp.asset.json";
import img_25_snoopy_cloud_gazing from "@/assets/lens/camera31/25-snoopy-cloud-gazing.webp.asset.json";
import img_26_snoopy_beach_balloons from "@/assets/lens/camera31/26-snoopy-beach-balloons.webp.asset.json";
import img_28_spider_graffiti from "@/assets/lens/camera31/28-spider-graffiti.webp.asset.json";
import img_29_sunset_quack from "@/assets/lens/camera31/29-sunset-quack.webp.asset.json";
import img_30_tom_mugshot from "@/assets/lens/camera31/30-tom-mugshot.webp.asset.json";
import img_32_crunchy_ice_cream from "@/assets/lens/camera31/32-crunchy-ice-cream.webp.asset.json";
import img_34_ghost_cat from "@/assets/lens/camera31/34-ghost-cat.webp.asset.json";

export type Camera31Design = { slug: string; name: string; file: string; image: string };

export const CAMERA31_SCOPE_NOTE: Record<Lang, string> = {
  fr: "Skin pour la zone caméra uniquement. Téléphone et coque non inclus.",
  en: "Skin for the camera area only. Phone and case not included.",
  ar: "سكين لمنطقة الكاميرا فقط. الهاتف والغطاء غير متضمنين.",
};

export const CAMERA31_DESIGNS: Camera31Design[] = [
  { slug: "dreamy-puppy", name: "Dreamy Puppy", file: "01-dreamy-puppy.webp", image: img_01_dreamy_puppy.url },
  { slug: "cosmic-explorer", name: "Cosmic Explorer", file: "02-cosmic-explorer.webp", image: img_02_cosmic_explorer.url },
  { slug: "capybara-afterhours", name: "Capybara Afterhours", file: "03-capybara-afterhours.webp", image: img_03_capybara_afterhours.url },
  { slug: "little-reaper", name: "Little Reaper", file: "04-little-reaper.webp", image: img_04_little_reaper.url },
  { slug: "chibi-gundam", name: "Chibi Gundam", file: "05-chibi-gundam.webp", image: img_05_chibi_gundam.url },
  { slug: "crystal-bunny", name: "Crystal Bunny", file: "06-crystal-bunny.webp", image: img_06_crystal_bunny.url },
  { slug: "orbit-bandit", name: "Orbit Bandit", file: "07-orbit-bandit.webp", image: img_07_orbit_bandit.url },
  { slug: "doraemon-sky-dream", name: "Doraemon Sky Dream", file: "08-doraemon-sky-dream.webp", image: img_08_doraemon_sky_dream.url },
  { slug: "doraemon-pink-door", name: "Doraemon Pink Door", file: "09-doraemon-pink-door.webp", image: img_09_doraemon_pink_door.url },
  { slug: "atay-cat", name: "Atay Cat", file: "10-atay-cat.webp", image: img_10_atay_cat.url },
  { slug: "funny-duck", name: "Funny Duck", file: "11-funny-duck.webp", image: img_11_funny_duck.url },
  { slug: "tom-cool-vibes", name: "Tom Cool Vibes", file: "12-tom-cool-vibes.webp", image: img_12_tom_cool_vibes.url },
  { slug: "matcha-dragon", name: "Matcha Dragon", file: "13-matcha-dragon.webp", image: img_13_matcha_dragon.url },
  { slug: "astral-koi", name: "Astral Koi", file: "14-astral-koi.webp", image: img_14_astral_koi.url },
  { slug: "ramen-ronin", name: "Ramen Ronin", file: "15-ramen-ronin.webp", image: img_15_ramen_ronin.url },
  { slug: "kickflip-frog", name: "Kickflip Frog", file: "16-kickflip-frog.webp", image: img_16_kickflip_frog.url },
  { slug: "cosmic-black-cat", name: "Cosmic Black Cat", file: "17-cosmic-black-cat.webp", image: img_17_cosmic_black_cat.url },
  { slug: "neon-kitsune", name: "Neon Kitsune", file: "18-neon-kitsune.webp", image: img_18_neon_kitsune.url },
  { slug: "rainy-day-duo", name: "Rainy Day Duo", file: "19-rainy-day-duo.webp", image: img_19_rainy_day_duo.url },
  { slug: "shin-chan-shiro-nap", name: "Shin-chan & Shiro Nap", file: "20-shin-chan-shiro-nap.webp", image: img_20_shin_chan_shiro_nap.url },
  { slug: "shin-chan-chill-beats", name: "Shin-chan Chill Beats", file: "21-shin-chan-chill-beats.webp", image: img_21_shin_chan_chill_beats.url },
  { slug: "shin-chan-midnight", name: "Shin-chan Midnight", file: "22-shin-chan-midnight.webp", image: img_22_shin_chan_midnight.url },
  { slug: "ghost-espresso", name: "Ghost Espresso", file: "23-ghost-espresso.webp", image: img_23_ghost_espresso.url },
  { slug: "midnight-cat", name: "Midnight Cat", file: "24-midnight-cat.webp", image: img_24_midnight_cat.url },
  { slug: "snoopy-cloud-gazing", name: "Snoopy Cloud Gazing", file: "25-snoopy-cloud-gazing.webp", image: img_25_snoopy_cloud_gazing.url },
  { slug: "snoopy-beach-balloons", name: "Snoopy Beach Balloons", file: "26-snoopy-beach-balloons.webp", image: img_26_snoopy_beach_balloons.url },
  { slug: "spider-graffiti", name: "Spider Graffiti", file: "28-spider-graffiti.webp", image: img_28_spider_graffiti.url },
  { slug: "sunset-quack", name: "Sunset Quack", file: "29-sunset-quack.webp", image: img_29_sunset_quack.url },
  { slug: "tom-mugshot", name: "Tom Mugshot", file: "30-tom-mugshot.webp", image: img_30_tom_mugshot.url },
  { slug: "crunchy-ice-cream", name: "Crunchy Ice Cream", file: "32-crunchy-ice-cream.webp", image: img_32_crunchy_ice_cream.url },
  { slug: "ghost-cat", name: "Ghost Cat", file: "34-ghost-cat.webp", image: img_34_ghost_cat.url },
];

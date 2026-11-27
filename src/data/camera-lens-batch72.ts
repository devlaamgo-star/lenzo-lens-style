import type { CameraLensSkin } from "./camera-lens-types";
import { CAMERA_ONLY_NOTE } from "./camera-lens-types";
import asset0 from "@/assets/lens/batch72/001-comic-boom/01-cover.webp.asset.json";
import asset1 from "@/assets/lens/batch72/001-comic-boom/02.webp.asset.json";
import asset2 from "@/assets/lens/batch72/001-comic-boom/03.webp.asset.json";
import asset3 from "@/assets/lens/batch72/001-comic-boom/04.webp.asset.json";
import asset4 from "@/assets/lens/batch72/001-comic-boom/05.webp.asset.json";
import asset5 from "@/assets/lens/batch72/001-comic-boom/06.webp.asset.json";
import asset6 from "@/assets/lens/batch72/001-comic-boom/_responsive/cover-480.webp.asset.json";
import asset7 from "@/assets/lens/batch72/001-comic-boom/_responsive/cover-800.webp.asset.json";
import asset8 from "@/assets/lens/batch72/002-doodles-pop/01-cover.webp.asset.json";
import asset9 from "@/assets/lens/batch72/002-doodles-pop/02.webp.asset.json";
import asset10 from "@/assets/lens/batch72/002-doodles-pop/03.webp.asset.json";
import asset11 from "@/assets/lens/batch72/002-doodles-pop/04.webp.asset.json";
import asset12 from "@/assets/lens/batch72/002-doodles-pop/05.webp.asset.json";
import asset13 from "@/assets/lens/batch72/002-doodles-pop/06.webp.asset.json";
import asset14 from "@/assets/lens/batch72/002-doodles-pop/07.webp.asset.json";
import asset15 from "@/assets/lens/batch72/002-doodles-pop/_responsive/cover-480.webp.asset.json";
import asset16 from "@/assets/lens/batch72/002-doodles-pop/_responsive/cover-800.webp.asset.json";
import asset17 from "@/assets/lens/batch72/003-chat-bleu-tourbillon/01-cover.webp.asset.json";
import asset18 from "@/assets/lens/batch72/003-chat-bleu-tourbillon/02.webp.asset.json";
import asset19 from "@/assets/lens/batch72/003-chat-bleu-tourbillon/03.webp.asset.json";
import asset20 from "@/assets/lens/batch72/003-chat-bleu-tourbillon/04.webp.asset.json";
import asset21 from "@/assets/lens/batch72/003-chat-bleu-tourbillon/05.webp.asset.json";
import asset22 from "@/assets/lens/batch72/003-chat-bleu-tourbillon/06.webp.asset.json";
import asset23 from "@/assets/lens/batch72/003-chat-bleu-tourbillon/_responsive/cover-480.webp.asset.json";
import asset24 from "@/assets/lens/batch72/003-chat-bleu-tourbillon/_responsive/cover-800.webp.asset.json";
import asset25 from "@/assets/lens/batch72/004-petite-faucheuse/01-cover.webp.asset.json";
import asset26 from "@/assets/lens/batch72/004-petite-faucheuse/02.webp.asset.json";
import asset27 from "@/assets/lens/batch72/004-petite-faucheuse/03.webp.asset.json";
import asset28 from "@/assets/lens/batch72/004-petite-faucheuse/04.webp.asset.json";
import asset29 from "@/assets/lens/batch72/004-petite-faucheuse/05.webp.asset.json";
import asset30 from "@/assets/lens/batch72/004-petite-faucheuse/06.webp.asset.json";
import asset31 from "@/assets/lens/batch72/004-petite-faucheuse/07.webp.asset.json";
import asset32 from "@/assets/lens/batch72/004-petite-faucheuse/_responsive/cover-480.webp.asset.json";
import asset33 from "@/assets/lens/batch72/004-petite-faucheuse/_responsive/cover-800.webp.asset.json";
import asset34 from "@/assets/lens/batch72/005-noel-etoile/01-cover.webp.asset.json";
import asset35 from "@/assets/lens/batch72/005-noel-etoile/02.webp.asset.json";
import asset36 from "@/assets/lens/batch72/005-noel-etoile/03.webp.asset.json";
import asset37 from "@/assets/lens/batch72/005-noel-etoile/04.webp.asset.json";
import asset38 from "@/assets/lens/batch72/005-noel-etoile/05.webp.asset.json";
import asset39 from "@/assets/lens/batch72/005-noel-etoile/06.webp.asset.json";
import asset40 from "@/assets/lens/batch72/005-noel-etoile/07.webp.asset.json";
import asset41 from "@/assets/lens/batch72/005-noel-etoile/_responsive/cover-480.webp.asset.json";
import asset42 from "@/assets/lens/batch72/005-noel-etoile/_responsive/cover-800.webp.asset.json";
import asset43 from "@/assets/lens/batch72/006-sapin-retro/01-cover.webp.asset.json";
import asset44 from "@/assets/lens/batch72/006-sapin-retro/02.webp.asset.json";
import asset45 from "@/assets/lens/batch72/006-sapin-retro/03.webp.asset.json";
import asset46 from "@/assets/lens/batch72/006-sapin-retro/04.webp.asset.json";
import asset47 from "@/assets/lens/batch72/006-sapin-retro/05.webp.asset.json";
import asset48 from "@/assets/lens/batch72/006-sapin-retro/06.webp.asset.json";
import asset49 from "@/assets/lens/batch72/006-sapin-retro/07.webp.asset.json";
import asset50 from "@/assets/lens/batch72/006-sapin-retro/_responsive/cover-480.webp.asset.json";
import asset51 from "@/assets/lens/batch72/006-sapin-retro/_responsive/cover-800.webp.asset.json";
import asset52 from "@/assets/lens/batch72/007-ordi-tricot/01-cover.webp.asset.json";
import asset53 from "@/assets/lens/batch72/007-ordi-tricot/02.webp.asset.json";
import asset54 from "@/assets/lens/batch72/007-ordi-tricot/03.webp.asset.json";
import asset55 from "@/assets/lens/batch72/007-ordi-tricot/04.webp.asset.json";
import asset56 from "@/assets/lens/batch72/007-ordi-tricot/05.webp.asset.json";
import asset57 from "@/assets/lens/batch72/007-ordi-tricot/06.webp.asset.json";
import asset58 from "@/assets/lens/batch72/007-ordi-tricot/07.webp.asset.json";
import asset59 from "@/assets/lens/batch72/007-ordi-tricot/_responsive/cover-480.webp.asset.json";
import asset60 from "@/assets/lens/batch72/007-ordi-tricot/_responsive/cover-800.webp.asset.json";
import asset61 from "@/assets/lens/batch72/008-flocons-monochromes/01-cover.webp.asset.json";
import asset62 from "@/assets/lens/batch72/008-flocons-monochromes/02.webp.asset.json";
import asset63 from "@/assets/lens/batch72/008-flocons-monochromes/03.webp.asset.json";
import asset64 from "@/assets/lens/batch72/008-flocons-monochromes/04.webp.asset.json";
import asset65 from "@/assets/lens/batch72/008-flocons-monochromes/05.webp.asset.json";
import asset66 from "@/assets/lens/batch72/008-flocons-monochromes/06.webp.asset.json";
import asset67 from "@/assets/lens/batch72/008-flocons-monochromes/07.webp.asset.json";
import asset68 from "@/assets/lens/batch72/008-flocons-monochromes/_responsive/cover-480.webp.asset.json";
import asset69 from "@/assets/lens/batch72/008-flocons-monochromes/_responsive/cover-800.webp.asset.json";
import asset70 from "@/assets/lens/batch72/009-flocons-glaces/01-cover.webp.asset.json";
import asset71 from "@/assets/lens/batch72/009-flocons-glaces/02.webp.asset.json";
import asset72 from "@/assets/lens/batch72/009-flocons-glaces/03.webp.asset.json";
import asset73 from "@/assets/lens/batch72/009-flocons-glaces/04.webp.asset.json";
import asset74 from "@/assets/lens/batch72/009-flocons-glaces/05.webp.asset.json";
import asset75 from "@/assets/lens/batch72/009-flocons-glaces/06.webp.asset.json";
import asset76 from "@/assets/lens/batch72/009-flocons-glaces/07.webp.asset.json";
import asset77 from "@/assets/lens/batch72/009-flocons-glaces/_responsive/cover-480.webp.asset.json";
import asset78 from "@/assets/lens/batch72/009-flocons-glaces/_responsive/cover-800.webp.asset.json";
import asset79 from "@/assets/lens/batch72/010-flocons-cuivres/01-cover.webp.asset.json";
import asset80 from "@/assets/lens/batch72/010-flocons-cuivres/02.webp.asset.json";
import asset81 from "@/assets/lens/batch72/010-flocons-cuivres/03.webp.asset.json";
import asset82 from "@/assets/lens/batch72/010-flocons-cuivres/04.webp.asset.json";
import asset83 from "@/assets/lens/batch72/010-flocons-cuivres/05.webp.asset.json";
import asset84 from "@/assets/lens/batch72/010-flocons-cuivres/06.webp.asset.json";
import asset85 from "@/assets/lens/batch72/010-flocons-cuivres/07.webp.asset.json";
import asset86 from "@/assets/lens/batch72/010-flocons-cuivres/_responsive/cover-480.webp.asset.json";
import asset87 from "@/assets/lens/batch72/010-flocons-cuivres/_responsive/cover-800.webp.asset.json";
import asset88 from "@/assets/lens/batch72/011-pins-de-minuit/01-cover.webp.asset.json";
import asset89 from "@/assets/lens/batch72/011-pins-de-minuit/02.webp.asset.json";
import asset90 from "@/assets/lens/batch72/011-pins-de-minuit/03.webp.asset.json";
import asset91 from "@/assets/lens/batch72/011-pins-de-minuit/04.webp.asset.json";
import asset92 from "@/assets/lens/batch72/011-pins-de-minuit/05.webp.asset.json";
import asset93 from "@/assets/lens/batch72/011-pins-de-minuit/06.webp.asset.json";
import asset94 from "@/assets/lens/batch72/011-pins-de-minuit/07.webp.asset.json";
import asset95 from "@/assets/lens/batch72/011-pins-de-minuit/_responsive/cover-480.webp.asset.json";
import asset96 from "@/assets/lens/batch72/011-pins-de-minuit/_responsive/cover-800.webp.asset.json";
import asset97 from "@/assets/lens/batch72/012-flocons-de-noel/01-cover.webp.asset.json";
import asset98 from "@/assets/lens/batch72/012-flocons-de-noel/02.webp.asset.json";
import asset99 from "@/assets/lens/batch72/012-flocons-de-noel/03.webp.asset.json";
import asset100 from "@/assets/lens/batch72/012-flocons-de-noel/04.webp.asset.json";
import asset101 from "@/assets/lens/batch72/012-flocons-de-noel/05.webp.asset.json";
import asset102 from "@/assets/lens/batch72/012-flocons-de-noel/06.webp.asset.json";
import asset103 from "@/assets/lens/batch72/012-flocons-de-noel/07.webp.asset.json";
import asset104 from "@/assets/lens/batch72/012-flocons-de-noel/_responsive/cover-480.webp.asset.json";
import asset105 from "@/assets/lens/batch72/012-flocons-de-noel/_responsive/cover-800.webp.asset.json";
import asset106 from "@/assets/lens/batch72/013-grenouille-chill/01-cover.webp.asset.json";
import asset107 from "@/assets/lens/batch72/013-grenouille-chill/02.webp.asset.json";
import asset108 from "@/assets/lens/batch72/013-grenouille-chill/03.webp.asset.json";
import asset109 from "@/assets/lens/batch72/013-grenouille-chill/04.webp.asset.json";
import asset110 from "@/assets/lens/batch72/013-grenouille-chill/05.webp.asset.json";
import asset111 from "@/assets/lens/batch72/013-grenouille-chill/06.webp.asset.json";
import asset112 from "@/assets/lens/batch72/013-grenouille-chill/07.webp.asset.json";
import asset113 from "@/assets/lens/batch72/013-grenouille-chill/_responsive/cover-480.webp.asset.json";
import asset114 from "@/assets/lens/batch72/013-grenouille-chill/_responsive/cover-800.webp.asset.json";
import asset115 from "@/assets/lens/batch72/014-carpe-de-minuit/01-cover.webp.asset.json";
import asset116 from "@/assets/lens/batch72/014-carpe-de-minuit/02.webp.asset.json";
import asset117 from "@/assets/lens/batch72/014-carpe-de-minuit/03.webp.asset.json";
import asset118 from "@/assets/lens/batch72/014-carpe-de-minuit/04.webp.asset.json";
import asset119 from "@/assets/lens/batch72/014-carpe-de-minuit/05.webp.asset.json";
import asset120 from "@/assets/lens/batch72/014-carpe-de-minuit/06.webp.asset.json";
import asset121 from "@/assets/lens/batch72/014-carpe-de-minuit/07.webp.asset.json";
import asset122 from "@/assets/lens/batch72/014-carpe-de-minuit/_responsive/cover-480.webp.asset.json";
import asset123 from "@/assets/lens/batch72/014-carpe-de-minuit/_responsive/cover-800.webp.asset.json";
import asset124 from "@/assets/lens/batch72/015-mosaique-orange/01-cover.webp.asset.json";
import asset125 from "@/assets/lens/batch72/015-mosaique-orange/02.webp.asset.json";
import asset126 from "@/assets/lens/batch72/015-mosaique-orange/03.webp.asset.json";
import asset127 from "@/assets/lens/batch72/015-mosaique-orange/04.webp.asset.json";
import asset128 from "@/assets/lens/batch72/015-mosaique-orange/05.webp.asset.json";
import asset129 from "@/assets/lens/batch72/015-mosaique-orange/06.webp.asset.json";
import asset130 from "@/assets/lens/batch72/015-mosaique-orange/07.webp.asset.json";
import asset131 from "@/assets/lens/batch72/015-mosaique-orange/_responsive/cover-480.webp.asset.json";
import asset132 from "@/assets/lens/batch72/015-mosaique-orange/_responsive/cover-800.webp.asset.json";
import asset133 from "@/assets/lens/batch72/016-explosion-bd/01-cover.webp.asset.json";
import asset134 from "@/assets/lens/batch72/016-explosion-bd/02.webp.asset.json";
import asset135 from "@/assets/lens/batch72/016-explosion-bd/03.webp.asset.json";
import asset136 from "@/assets/lens/batch72/016-explosion-bd/04.webp.asset.json";
import asset137 from "@/assets/lens/batch72/016-explosion-bd/05.webp.asset.json";
import asset138 from "@/assets/lens/batch72/016-explosion-bd/06.webp.asset.json";
import asset139 from "@/assets/lens/batch72/016-explosion-bd/07.webp.asset.json";
import asset140 from "@/assets/lens/batch72/016-explosion-bd/_responsive/cover-480.webp.asset.json";
import asset141 from "@/assets/lens/batch72/016-explosion-bd/_responsive/cover-800.webp.asset.json";
import asset142 from "@/assets/lens/batch72/017-cassettes-retro/01-cover.webp.asset.json";
import asset143 from "@/assets/lens/batch72/017-cassettes-retro/02.webp.asset.json";
import asset144 from "@/assets/lens/batch72/017-cassettes-retro/03.webp.asset.json";
import asset145 from "@/assets/lens/batch72/017-cassettes-retro/04.webp.asset.json";
import asset146 from "@/assets/lens/batch72/017-cassettes-retro/05.webp.asset.json";
import asset147 from "@/assets/lens/batch72/017-cassettes-retro/06.webp.asset.json";
import asset148 from "@/assets/lens/batch72/017-cassettes-retro/07.webp.asset.json";
import asset149 from "@/assets/lens/batch72/017-cassettes-retro/_responsive/cover-480.webp.asset.json";
import asset150 from "@/assets/lens/batch72/017-cassettes-retro/_responsive/cover-800.webp.asset.json";
import asset151 from "@/assets/lens/batch72/018-dollars-vintage/01-cover.webp.asset.json";
import asset152 from "@/assets/lens/batch72/018-dollars-vintage/02.webp.asset.json";
import asset153 from "@/assets/lens/batch72/018-dollars-vintage/03.webp.asset.json";
import asset154 from "@/assets/lens/batch72/018-dollars-vintage/04.webp.asset.json";
import asset155 from "@/assets/lens/batch72/018-dollars-vintage/05.webp.asset.json";
import asset156 from "@/assets/lens/batch72/018-dollars-vintage/06.webp.asset.json";
import asset157 from "@/assets/lens/batch72/018-dollars-vintage/07.webp.asset.json";
import asset158 from "@/assets/lens/batch72/018-dollars-vintage/_responsive/cover-480.webp.asset.json";
import asset159 from "@/assets/lens/batch72/018-dollars-vintage/_responsive/cover-800.webp.asset.json";
import asset160 from "@/assets/lens/batch72/019-sourire-orange/01-cover.webp.asset.json";
import asset161 from "@/assets/lens/batch72/019-sourire-orange/02.webp.asset.json";
import asset162 from "@/assets/lens/batch72/019-sourire-orange/03.webp.asset.json";
import asset163 from "@/assets/lens/batch72/019-sourire-orange/04.webp.asset.json";
import asset164 from "@/assets/lens/batch72/019-sourire-orange/05.webp.asset.json";
import asset165 from "@/assets/lens/batch72/019-sourire-orange/06.webp.asset.json";
import asset166 from "@/assets/lens/batch72/019-sourire-orange/07.webp.asset.json";
import asset167 from "@/assets/lens/batch72/019-sourire-orange/_responsive/cover-480.webp.asset.json";
import asset168 from "@/assets/lens/batch72/019-sourire-orange/_responsive/cover-800.webp.asset.json";
import asset169 from "@/assets/lens/batch72/020-crane-graffiti/01-cover.webp.asset.json";
import asset170 from "@/assets/lens/batch72/020-crane-graffiti/02.webp.asset.json";
import asset171 from "@/assets/lens/batch72/020-crane-graffiti/03.webp.asset.json";
import asset172 from "@/assets/lens/batch72/020-crane-graffiti/04.webp.asset.json";
import asset173 from "@/assets/lens/batch72/020-crane-graffiti/05.webp.asset.json";
import asset174 from "@/assets/lens/batch72/020-crane-graffiti/06.webp.asset.json";
import asset175 from "@/assets/lens/batch72/020-crane-graffiti/07.webp.asset.json";
import asset176 from "@/assets/lens/batch72/020-crane-graffiti/_responsive/cover-480.webp.asset.json";
import asset177 from "@/assets/lens/batch72/020-crane-graffiti/_responsive/cover-800.webp.asset.json";
import asset178 from "@/assets/lens/batch72/021-mur-vintage/01-cover.webp.asset.json";
import asset179 from "@/assets/lens/batch72/021-mur-vintage/02.webp.asset.json";
import asset180 from "@/assets/lens/batch72/021-mur-vintage/03.webp.asset.json";
import asset181 from "@/assets/lens/batch72/021-mur-vintage/04.webp.asset.json";
import asset182 from "@/assets/lens/batch72/021-mur-vintage/05.webp.asset.json";
import asset183 from "@/assets/lens/batch72/021-mur-vintage/06.webp.asset.json";
import asset184 from "@/assets/lens/batch72/021-mur-vintage/07.webp.asset.json";
import asset185 from "@/assets/lens/batch72/021-mur-vintage/_responsive/cover-480.webp.asset.json";
import asset186 from "@/assets/lens/batch72/021-mur-vintage/_responsive/cover-800.webp.asset.json";
import asset187 from "@/assets/lens/batch72/022-tags-sepia/01-cover.webp.asset.json";
import asset188 from "@/assets/lens/batch72/022-tags-sepia/02.webp.asset.json";
import asset189 from "@/assets/lens/batch72/022-tags-sepia/03.webp.asset.json";
import asset190 from "@/assets/lens/batch72/022-tags-sepia/04.webp.asset.json";
import asset191 from "@/assets/lens/batch72/022-tags-sepia/05.webp.asset.json";
import asset192 from "@/assets/lens/batch72/022-tags-sepia/06.webp.asset.json";
import asset193 from "@/assets/lens/batch72/022-tags-sepia/07.webp.asset.json";
import asset194 from "@/assets/lens/batch72/022-tags-sepia/_responsive/cover-480.webp.asset.json";
import asset195 from "@/assets/lens/batch72/022-tags-sepia/_responsive/cover-800.webp.asset.json";
import asset196 from "@/assets/lens/batch72/023-dollars-cartoon/01-cover.webp.asset.json";
import asset197 from "@/assets/lens/batch72/023-dollars-cartoon/02.webp.asset.json";
import asset198 from "@/assets/lens/batch72/023-dollars-cartoon/03.webp.asset.json";
import asset199 from "@/assets/lens/batch72/023-dollars-cartoon/04.webp.asset.json";
import asset200 from "@/assets/lens/batch72/023-dollars-cartoon/05.webp.asset.json";
import asset201 from "@/assets/lens/batch72/023-dollars-cartoon/06.webp.asset.json";
import asset202 from "@/assets/lens/batch72/023-dollars-cartoon/07.webp.asset.json";
import asset203 from "@/assets/lens/batch72/023-dollars-cartoon/_responsive/cover-480.webp.asset.json";
import asset204 from "@/assets/lens/batch72/023-dollars-cartoon/_responsive/cover-800.webp.asset.json";
import asset205 from "@/assets/lens/batch72/024-lapin-pop-jaune/01-cover.webp.asset.json";
import asset206 from "@/assets/lens/batch72/024-lapin-pop-jaune/02.webp.asset.json";
import asset207 from "@/assets/lens/batch72/024-lapin-pop-jaune/03.webp.asset.json";
import asset208 from "@/assets/lens/batch72/024-lapin-pop-jaune/04.webp.asset.json";
import asset209 from "@/assets/lens/batch72/024-lapin-pop-jaune/05.webp.asset.json";
import asset210 from "@/assets/lens/batch72/024-lapin-pop-jaune/06.webp.asset.json";
import asset211 from "@/assets/lens/batch72/024-lapin-pop-jaune/07.webp.asset.json";
import asset212 from "@/assets/lens/batch72/024-lapin-pop-jaune/_responsive/cover-480.webp.asset.json";
import asset213 from "@/assets/lens/batch72/024-lapin-pop-jaune/_responsive/cover-800.webp.asset.json";
import asset214 from "@/assets/lens/batch72/025-chat-de-minuit/01-cover.webp.asset.json";
import asset215 from "@/assets/lens/batch72/025-chat-de-minuit/02.webp.asset.json";
import asset216 from "@/assets/lens/batch72/025-chat-de-minuit/03.webp.asset.json";
import asset217 from "@/assets/lens/batch72/025-chat-de-minuit/04.webp.asset.json";
import asset218 from "@/assets/lens/batch72/025-chat-de-minuit/05.webp.asset.json";
import asset219 from "@/assets/lens/batch72/025-chat-de-minuit/06.webp.asset.json";
import asset220 from "@/assets/lens/batch72/025-chat-de-minuit/07.webp.asset.json";
import asset221 from "@/assets/lens/batch72/025-chat-de-minuit/_responsive/cover-480.webp.asset.json";
import asset222 from "@/assets/lens/batch72/025-chat-de-minuit/_responsive/cover-800.webp.asset.json";
import asset223 from "@/assets/lens/batch72/026-graffiti-chromatique/01-cover.webp.asset.json";
import asset224 from "@/assets/lens/batch72/026-graffiti-chromatique/02.webp.asset.json";
import asset225 from "@/assets/lens/batch72/026-graffiti-chromatique/03.webp.asset.json";
import asset226 from "@/assets/lens/batch72/026-graffiti-chromatique/04.webp.asset.json";
import asset227 from "@/assets/lens/batch72/026-graffiti-chromatique/05.webp.asset.json";
import asset228 from "@/assets/lens/batch72/026-graffiti-chromatique/06.webp.asset.json";
import asset229 from "@/assets/lens/batch72/026-graffiti-chromatique/07.webp.asset.json";
import asset230 from "@/assets/lens/batch72/026-graffiti-chromatique/_responsive/cover-480.webp.asset.json";
import asset231 from "@/assets/lens/batch72/026-graffiti-chromatique/_responsive/cover-800.webp.asset.json";
import asset232 from "@/assets/lens/batch72/027-petit-gorille/01-cover.webp.asset.json";
import asset233 from "@/assets/lens/batch72/027-petit-gorille/02.webp.asset.json";
import asset234 from "@/assets/lens/batch72/027-petit-gorille/03.webp.asset.json";
import asset235 from "@/assets/lens/batch72/027-petit-gorille/04.webp.asset.json";
import asset236 from "@/assets/lens/batch72/027-petit-gorille/05.webp.asset.json";
import asset237 from "@/assets/lens/batch72/027-petit-gorille/06.webp.asset.json";
import asset238 from "@/assets/lens/batch72/027-petit-gorille/_responsive/cover-480.webp.asset.json";
import asset239 from "@/assets/lens/batch72/027-petit-gorille/_responsive/cover-800.webp.asset.json";
import asset240 from "@/assets/lens/batch72/028-noel-en-contours/01-cover.webp.asset.json";
import asset241 from "@/assets/lens/batch72/028-noel-en-contours/02.webp.asset.json";
import asset242 from "@/assets/lens/batch72/028-noel-en-contours/03.webp.asset.json";
import asset243 from "@/assets/lens/batch72/028-noel-en-contours/04.webp.asset.json";
import asset244 from "@/assets/lens/batch72/028-noel-en-contours/05.webp.asset.json";
import asset245 from "@/assets/lens/batch72/028-noel-en-contours/06.webp.asset.json";
import asset246 from "@/assets/lens/batch72/028-noel-en-contours/07.webp.asset.json";
import asset247 from "@/assets/lens/batch72/028-noel-en-contours/_responsive/cover-480.webp.asset.json";
import asset248 from "@/assets/lens/batch72/028-noel-en-contours/_responsive/cover-800.webp.asset.json";
import asset249 from "@/assets/lens/batch72/029-rennes-joyeux/01-cover.webp.asset.json";
import asset250 from "@/assets/lens/batch72/029-rennes-joyeux/02.webp.asset.json";
import asset251 from "@/assets/lens/batch72/029-rennes-joyeux/03.webp.asset.json";
import asset252 from "@/assets/lens/batch72/029-rennes-joyeux/04.webp.asset.json";
import asset253 from "@/assets/lens/batch72/029-rennes-joyeux/05.webp.asset.json";
import asset254 from "@/assets/lens/batch72/029-rennes-joyeux/06.webp.asset.json";
import asset255 from "@/assets/lens/batch72/029-rennes-joyeux/07.webp.asset.json";
import asset256 from "@/assets/lens/batch72/029-rennes-joyeux/_responsive/cover-480.webp.asset.json";
import asset257 from "@/assets/lens/batch72/029-rennes-joyeux/_responsive/cover-800.webp.asset.json";
import asset258 from "@/assets/lens/batch72/030-barbe-de-noel/01-cover.webp.asset.json";
import asset259 from "@/assets/lens/batch72/030-barbe-de-noel/02.webp.asset.json";
import asset260 from "@/assets/lens/batch72/030-barbe-de-noel/03.webp.asset.json";
import asset261 from "@/assets/lens/batch72/030-barbe-de-noel/04.webp.asset.json";
import asset262 from "@/assets/lens/batch72/030-barbe-de-noel/05.webp.asset.json";
import asset263 from "@/assets/lens/batch72/030-barbe-de-noel/06.webp.asset.json";
import asset264 from "@/assets/lens/batch72/030-barbe-de-noel/07.webp.asset.json";
import asset265 from "@/assets/lens/batch72/030-barbe-de-noel/_responsive/cover-480.webp.asset.json";
import asset266 from "@/assets/lens/batch72/030-barbe-de-noel/_responsive/cover-800.webp.asset.json";
import asset267 from "@/assets/lens/batch72/031-cadeaux-emeraude/01-cover.webp.asset.json";
import asset268 from "@/assets/lens/batch72/031-cadeaux-emeraude/02.webp.asset.json";
import asset269 from "@/assets/lens/batch72/031-cadeaux-emeraude/03.webp.asset.json";
import asset270 from "@/assets/lens/batch72/031-cadeaux-emeraude/04.webp.asset.json";
import asset271 from "@/assets/lens/batch72/031-cadeaux-emeraude/05.webp.asset.json";
import asset272 from "@/assets/lens/batch72/031-cadeaux-emeraude/06.webp.asset.json";
import asset273 from "@/assets/lens/batch72/031-cadeaux-emeraude/07.webp.asset.json";
import asset274 from "@/assets/lens/batch72/031-cadeaux-emeraude/_responsive/cover-480.webp.asset.json";
import asset275 from "@/assets/lens/batch72/031-cadeaux-emeraude/_responsive/cover-800.webp.asset.json";
import asset276 from "@/assets/lens/batch72/032-noel-bleu-neon/01-cover.webp.asset.json";
import asset277 from "@/assets/lens/batch72/032-noel-bleu-neon/02.webp.asset.json";
import asset278 from "@/assets/lens/batch72/032-noel-bleu-neon/03.webp.asset.json";
import asset279 from "@/assets/lens/batch72/032-noel-bleu-neon/04.webp.asset.json";
import asset280 from "@/assets/lens/batch72/032-noel-bleu-neon/05.webp.asset.json";
import asset281 from "@/assets/lens/batch72/032-noel-bleu-neon/_responsive/cover-480.webp.asset.json";
import asset282 from "@/assets/lens/batch72/032-noel-bleu-neon/_responsive/cover-800.webp.asset.json";
import asset283 from "@/assets/lens/batch72/033-cranes-de-noel/01-cover.webp.asset.json";
import asset284 from "@/assets/lens/batch72/033-cranes-de-noel/02.webp.asset.json";
import asset285 from "@/assets/lens/batch72/033-cranes-de-noel/03.webp.asset.json";
import asset286 from "@/assets/lens/batch72/033-cranes-de-noel/04.webp.asset.json";
import asset287 from "@/assets/lens/batch72/033-cranes-de-noel/05.webp.asset.json";
import asset288 from "@/assets/lens/batch72/033-cranes-de-noel/06.webp.asset.json";
import asset289 from "@/assets/lens/batch72/033-cranes-de-noel/07.webp.asset.json";
import asset290 from "@/assets/lens/batch72/033-cranes-de-noel/_responsive/cover-480.webp.asset.json";
import asset291 from "@/assets/lens/batch72/033-cranes-de-noel/_responsive/cover-800.webp.asset.json";
import asset292 from "@/assets/lens/batch72/034-renne-celeste/01-cover.webp.asset.json";
import asset293 from "@/assets/lens/batch72/034-renne-celeste/02.webp.asset.json";
import asset294 from "@/assets/lens/batch72/034-renne-celeste/03.webp.asset.json";
import asset295 from "@/assets/lens/batch72/034-renne-celeste/04.webp.asset.json";
import asset296 from "@/assets/lens/batch72/034-renne-celeste/05.webp.asset.json";
import asset297 from "@/assets/lens/batch72/034-renne-celeste/06.webp.asset.json";
import asset298 from "@/assets/lens/batch72/034-renne-celeste/07.webp.asset.json";
import asset299 from "@/assets/lens/batch72/034-renne-celeste/_responsive/cover-480.webp.asset.json";
import asset300 from "@/assets/lens/batch72/034-renne-celeste/_responsive/cover-800.webp.asset.json";
import asset301 from "@/assets/lens/batch72/035-chat-pinceau/01-cover.webp.asset.json";
import asset302 from "@/assets/lens/batch72/035-chat-pinceau/02.webp.asset.json";
import asset303 from "@/assets/lens/batch72/035-chat-pinceau/03.webp.asset.json";
import asset304 from "@/assets/lens/batch72/035-chat-pinceau/04.webp.asset.json";
import asset305 from "@/assets/lens/batch72/035-chat-pinceau/05.webp.asset.json";
import asset306 from "@/assets/lens/batch72/035-chat-pinceau/06.webp.asset.json";
import asset307 from "@/assets/lens/batch72/035-chat-pinceau/07.webp.asset.json";
import asset308 from "@/assets/lens/batch72/035-chat-pinceau/_responsive/cover-480.webp.asset.json";
import asset309 from "@/assets/lens/batch72/035-chat-pinceau/_responsive/cover-800.webp.asset.json";
import asset310 from "@/assets/lens/batch72/036-chat-roux-geometrique/01-cover.webp.asset.json";
import asset311 from "@/assets/lens/batch72/036-chat-roux-geometrique/02.webp.asset.json";
import asset312 from "@/assets/lens/batch72/036-chat-roux-geometrique/03.webp.asset.json";
import asset313 from "@/assets/lens/batch72/036-chat-roux-geometrique/04.webp.asset.json";
import asset314 from "@/assets/lens/batch72/036-chat-roux-geometrique/05.webp.asset.json";
import asset315 from "@/assets/lens/batch72/036-chat-roux-geometrique/06.webp.asset.json";
import asset316 from "@/assets/lens/batch72/036-chat-roux-geometrique/07.webp.asset.json";
import asset317 from "@/assets/lens/batch72/036-chat-roux-geometrique/_responsive/cover-480.webp.asset.json";
import asset318 from "@/assets/lens/batch72/036-chat-roux-geometrique/_responsive/cover-800.webp.asset.json";
import asset319 from "@/assets/lens/batch72/037-touche-evasion/01-cover.webp.asset.json";
import asset320 from "@/assets/lens/batch72/037-touche-evasion/02.webp.asset.json";
import asset321 from "@/assets/lens/batch72/037-touche-evasion/03.webp.asset.json";
import asset322 from "@/assets/lens/batch72/037-touche-evasion/04.webp.asset.json";
import asset323 from "@/assets/lens/batch72/037-touche-evasion/05.webp.asset.json";
import asset324 from "@/assets/lens/batch72/037-touche-evasion/06.webp.asset.json";
import asset325 from "@/assets/lens/batch72/037-touche-evasion/07.webp.asset.json";
import asset326 from "@/assets/lens/batch72/037-touche-evasion/_responsive/cover-480.webp.asset.json";
import asset327 from "@/assets/lens/batch72/037-touche-evasion/_responsive/cover-800.webp.asset.json";
import asset328 from "@/assets/lens/batch72/038-mode-active/01-cover.webp.asset.json";
import asset329 from "@/assets/lens/batch72/038-mode-active/02.webp.asset.json";
import asset330 from "@/assets/lens/batch72/038-mode-active/03.webp.asset.json";
import asset331 from "@/assets/lens/batch72/038-mode-active/04.webp.asset.json";
import asset332 from "@/assets/lens/batch72/038-mode-active/05.webp.asset.json";
import asset333 from "@/assets/lens/batch72/038-mode-active/06.webp.asset.json";
import asset334 from "@/assets/lens/batch72/038-mode-active/07.webp.asset.json";
import asset335 from "@/assets/lens/batch72/038-mode-active/_responsive/cover-480.webp.asset.json";
import asset336 from "@/assets/lens/batch72/038-mode-active/_responsive/cover-800.webp.asset.json";
import asset337 from "@/assets/lens/batch72/039-chat-au-bandana/01-cover.webp.asset.json";
import asset338 from "@/assets/lens/batch72/039-chat-au-bandana/02.webp.asset.json";
import asset339 from "@/assets/lens/batch72/039-chat-au-bandana/03.webp.asset.json";
import asset340 from "@/assets/lens/batch72/039-chat-au-bandana/04.webp.asset.json";
import asset341 from "@/assets/lens/batch72/039-chat-au-bandana/05.webp.asset.json";
import asset342 from "@/assets/lens/batch72/039-chat-au-bandana/06.webp.asset.json";
import asset343 from "@/assets/lens/batch72/039-chat-au-bandana/07.webp.asset.json";
import asset344 from "@/assets/lens/batch72/039-chat-au-bandana/_responsive/cover-480.webp.asset.json";
import asset345 from "@/assets/lens/batch72/039-chat-au-bandana/_responsive/cover-800.webp.asset.json";
import asset346 from "@/assets/lens/batch72/040-portrait-carmin/01-cover.webp.asset.json";
import asset347 from "@/assets/lens/batch72/040-portrait-carmin/02.webp.asset.json";
import asset348 from "@/assets/lens/batch72/040-portrait-carmin/03.webp.asset.json";
import asset349 from "@/assets/lens/batch72/040-portrait-carmin/04.webp.asset.json";
import asset350 from "@/assets/lens/batch72/040-portrait-carmin/05.webp.asset.json";
import asset351 from "@/assets/lens/batch72/040-portrait-carmin/06.webp.asset.json";
import asset352 from "@/assets/lens/batch72/040-portrait-carmin/07.webp.asset.json";
import asset353 from "@/assets/lens/batch72/040-portrait-carmin/_responsive/cover-480.webp.asset.json";
import asset354 from "@/assets/lens/batch72/040-portrait-carmin/_responsive/cover-800.webp.asset.json";
import asset355 from "@/assets/lens/batch72/041-portrait-argente/01-cover.webp.asset.json";
import asset356 from "@/assets/lens/batch72/041-portrait-argente/02.webp.asset.json";
import asset357 from "@/assets/lens/batch72/041-portrait-argente/03.webp.asset.json";
import asset358 from "@/assets/lens/batch72/041-portrait-argente/04.webp.asset.json";
import asset359 from "@/assets/lens/batch72/041-portrait-argente/05.webp.asset.json";
import asset360 from "@/assets/lens/batch72/041-portrait-argente/06.webp.asset.json";
import asset361 from "@/assets/lens/batch72/041-portrait-argente/07.webp.asset.json";
import asset362 from "@/assets/lens/batch72/041-portrait-argente/_responsive/cover-480.webp.asset.json";
import asset363 from "@/assets/lens/batch72/041-portrait-argente/_responsive/cover-800.webp.asset.json";
import asset364 from "@/assets/lens/batch72/042-silhouette-urbaine/01-cover.webp.asset.json";
import asset365 from "@/assets/lens/batch72/042-silhouette-urbaine/02.webp.asset.json";
import asset366 from "@/assets/lens/batch72/042-silhouette-urbaine/03.webp.asset.json";
import asset367 from "@/assets/lens/batch72/042-silhouette-urbaine/04.webp.asset.json";
import asset368 from "@/assets/lens/batch72/042-silhouette-urbaine/05.webp.asset.json";
import asset369 from "@/assets/lens/batch72/042-silhouette-urbaine/06.webp.asset.json";
import asset370 from "@/assets/lens/batch72/042-silhouette-urbaine/07.webp.asset.json";
import asset371 from "@/assets/lens/batch72/042-silhouette-urbaine/_responsive/cover-480.webp.asset.json";
import asset372 from "@/assets/lens/batch72/042-silhouette-urbaine/_responsive/cover-800.webp.asset.json";
import asset373 from "@/assets/lens/batch72/043-monstre-pixel/01-cover.webp.asset.json";
import asset374 from "@/assets/lens/batch72/043-monstre-pixel/02.webp.asset.json";
import asset375 from "@/assets/lens/batch72/043-monstre-pixel/03.webp.asset.json";
import asset376 from "@/assets/lens/batch72/043-monstre-pixel/04.webp.asset.json";
import asset377 from "@/assets/lens/batch72/043-monstre-pixel/05.webp.asset.json";
import asset378 from "@/assets/lens/batch72/043-monstre-pixel/06.webp.asset.json";
import asset379 from "@/assets/lens/batch72/043-monstre-pixel/07.webp.asset.json";
import asset380 from "@/assets/lens/batch72/043-monstre-pixel/_responsive/cover-480.webp.asset.json";
import asset381 from "@/assets/lens/batch72/043-monstre-pixel/_responsive/cover-800.webp.asset.json";
import asset382 from "@/assets/lens/batch72/044-vol-dans-les-nuages/01-cover.webp.asset.json";
import asset383 from "@/assets/lens/batch72/044-vol-dans-les-nuages/02.webp.asset.json";
import asset384 from "@/assets/lens/batch72/044-vol-dans-les-nuages/03.webp.asset.json";
import asset385 from "@/assets/lens/batch72/044-vol-dans-les-nuages/04.webp.asset.json";
import asset386 from "@/assets/lens/batch72/044-vol-dans-les-nuages/05.webp.asset.json";
import asset387 from "@/assets/lens/batch72/044-vol-dans-les-nuages/06.webp.asset.json";
import asset388 from "@/assets/lens/batch72/044-vol-dans-les-nuages/07.webp.asset.json";
import asset389 from "@/assets/lens/batch72/044-vol-dans-les-nuages/_responsive/cover-480.webp.asset.json";
import asset390 from "@/assets/lens/batch72/044-vol-dans-les-nuages/_responsive/cover-800.webp.asset.json";
import asset391 from "@/assets/lens/batch72/045-vol-sur-la-foret-blanche/01-cover.webp.asset.json";
import asset392 from "@/assets/lens/batch72/045-vol-sur-la-foret-blanche/02.webp.asset.json";
import asset393 from "@/assets/lens/batch72/045-vol-sur-la-foret-blanche/03.webp.asset.json";
import asset394 from "@/assets/lens/batch72/045-vol-sur-la-foret-blanche/04.webp.asset.json";
import asset395 from "@/assets/lens/batch72/045-vol-sur-la-foret-blanche/05.webp.asset.json";
import asset396 from "@/assets/lens/batch72/045-vol-sur-la-foret-blanche/06.webp.asset.json";
import asset397 from "@/assets/lens/batch72/045-vol-sur-la-foret-blanche/07.webp.asset.json";
import asset398 from "@/assets/lens/batch72/045-vol-sur-la-foret-blanche/_responsive/cover-480.webp.asset.json";
import asset399 from "@/assets/lens/batch72/045-vol-sur-la-foret-blanche/_responsive/cover-800.webp.asset.json";
import asset400 from "@/assets/lens/batch72/046-oies-curieuses/01-cover.webp.asset.json";
import asset401 from "@/assets/lens/batch72/046-oies-curieuses/02.webp.asset.json";
import asset402 from "@/assets/lens/batch72/046-oies-curieuses/03.webp.asset.json";
import asset403 from "@/assets/lens/batch72/046-oies-curieuses/04.webp.asset.json";
import asset404 from "@/assets/lens/batch72/046-oies-curieuses/05.webp.asset.json";
import asset405 from "@/assets/lens/batch72/046-oies-curieuses/06.webp.asset.json";
import asset406 from "@/assets/lens/batch72/046-oies-curieuses/07.webp.asset.json";
import asset407 from "@/assets/lens/batch72/046-oies-curieuses/_responsive/cover-480.webp.asset.json";
import asset408 from "@/assets/lens/batch72/046-oies-curieuses/_responsive/cover-800.webp.asset.json";
import asset409 from "@/assets/lens/batch72/047-petit-monstre-bouh/01-cover.webp.asset.json";
import asset410 from "@/assets/lens/batch72/047-petit-monstre-bouh/02.webp.asset.json";
import asset411 from "@/assets/lens/batch72/047-petit-monstre-bouh/03.webp.asset.json";
import asset412 from "@/assets/lens/batch72/047-petit-monstre-bouh/04.webp.asset.json";
import asset413 from "@/assets/lens/batch72/047-petit-monstre-bouh/05.webp.asset.json";
import asset414 from "@/assets/lens/batch72/047-petit-monstre-bouh/06.webp.asset.json";
import asset415 from "@/assets/lens/batch72/047-petit-monstre-bouh/07.webp.asset.json";
import asset416 from "@/assets/lens/batch72/047-petit-monstre-bouh/_responsive/cover-480.webp.asset.json";
import asset417 from "@/assets/lens/batch72/047-petit-monstre-bouh/_responsive/cover-800.webp.asset.json";
import asset418 from "@/assets/lens/batch72/048-grenouille-detente/01-cover.webp.asset.json";
import asset419 from "@/assets/lens/batch72/048-grenouille-detente/02.webp.asset.json";
import asset420 from "@/assets/lens/batch72/048-grenouille-detente/03.webp.asset.json";
import asset421 from "@/assets/lens/batch72/048-grenouille-detente/04.webp.asset.json";
import asset422 from "@/assets/lens/batch72/048-grenouille-detente/05.webp.asset.json";
import asset423 from "@/assets/lens/batch72/048-grenouille-detente/06.webp.asset.json";
import asset424 from "@/assets/lens/batch72/048-grenouille-detente/07.webp.asset.json";
import asset425 from "@/assets/lens/batch72/048-grenouille-detente/_responsive/cover-480.webp.asset.json";
import asset426 from "@/assets/lens/batch72/048-grenouille-detente/_responsive/cover-800.webp.asset.json";
import asset427 from "@/assets/lens/batch72/049-coq-tricolore/01-cover.webp.asset.json";
import asset428 from "@/assets/lens/batch72/049-coq-tricolore/02.webp.asset.json";
import asset429 from "@/assets/lens/batch72/049-coq-tricolore/03.webp.asset.json";
import asset430 from "@/assets/lens/batch72/049-coq-tricolore/04.webp.asset.json";
import asset431 from "@/assets/lens/batch72/049-coq-tricolore/05.webp.asset.json";
import asset432 from "@/assets/lens/batch72/049-coq-tricolore/06.webp.asset.json";
import asset433 from "@/assets/lens/batch72/049-coq-tricolore/07.webp.asset.json";
import asset434 from "@/assets/lens/batch72/049-coq-tricolore/_responsive/cover-480.webp.asset.json";
import asset435 from "@/assets/lens/batch72/049-coq-tricolore/_responsive/cover-800.webp.asset.json";
import asset436 from "@/assets/lens/batch72/050-graffiti-fusion/01-cover.webp.asset.json";
import asset437 from "@/assets/lens/batch72/050-graffiti-fusion/02.webp.asset.json";
import asset438 from "@/assets/lens/batch72/050-graffiti-fusion/03.webp.asset.json";
import asset439 from "@/assets/lens/batch72/050-graffiti-fusion/04.webp.asset.json";
import asset440 from "@/assets/lens/batch72/050-graffiti-fusion/05.webp.asset.json";
import asset441 from "@/assets/lens/batch72/050-graffiti-fusion/06.webp.asset.json";
import asset442 from "@/assets/lens/batch72/050-graffiti-fusion/07.webp.asset.json";
import asset443 from "@/assets/lens/batch72/050-graffiti-fusion/_responsive/cover-480.webp.asset.json";
import asset444 from "@/assets/lens/batch72/050-graffiti-fusion/_responsive/cover-800.webp.asset.json";
import asset445 from "@/assets/lens/batch72/051-collage-punk/01-cover.webp.asset.json";
import asset446 from "@/assets/lens/batch72/051-collage-punk/02.webp.asset.json";
import asset447 from "@/assets/lens/batch72/051-collage-punk/03.webp.asset.json";
import asset448 from "@/assets/lens/batch72/051-collage-punk/04.webp.asset.json";
import asset449 from "@/assets/lens/batch72/051-collage-punk/05.webp.asset.json";
import asset450 from "@/assets/lens/batch72/051-collage-punk/06.webp.asset.json";
import asset451 from "@/assets/lens/batch72/051-collage-punk/07.webp.asset.json";
import asset452 from "@/assets/lens/batch72/051-collage-punk/_responsive/cover-480.webp.asset.json";
import asset453 from "@/assets/lens/batch72/051-collage-punk/_responsive/cover-800.webp.asset.json";
import asset454 from "@/assets/lens/batch72/052-typo-pop/01-cover.webp.asset.json";
import asset455 from "@/assets/lens/batch72/052-typo-pop/02.webp.asset.json";
import asset456 from "@/assets/lens/batch72/052-typo-pop/03.webp.asset.json";
import asset457 from "@/assets/lens/batch72/052-typo-pop/04.webp.asset.json";
import asset458 from "@/assets/lens/batch72/052-typo-pop/05.webp.asset.json";
import asset459 from "@/assets/lens/batch72/052-typo-pop/06.webp.asset.json";
import asset460 from "@/assets/lens/batch72/052-typo-pop/07.webp.asset.json";
import asset461 from "@/assets/lens/batch72/052-typo-pop/_responsive/cover-480.webp.asset.json";
import asset462 from "@/assets/lens/batch72/052-typo-pop/_responsive/cover-800.webp.asset.json";
import asset463 from "@/assets/lens/batch72/053-chat-sous-les-etoiles/01-cover.webp.asset.json";
import asset464 from "@/assets/lens/batch72/053-chat-sous-les-etoiles/02.webp.asset.json";
import asset465 from "@/assets/lens/batch72/053-chat-sous-les-etoiles/03.webp.asset.json";
import asset466 from "@/assets/lens/batch72/053-chat-sous-les-etoiles/04.webp.asset.json";
import asset467 from "@/assets/lens/batch72/053-chat-sous-les-etoiles/05.webp.asset.json";
import asset468 from "@/assets/lens/batch72/053-chat-sous-les-etoiles/06.webp.asset.json";
import asset469 from "@/assets/lens/batch72/053-chat-sous-les-etoiles/07.webp.asset.json";
import asset470 from "@/assets/lens/batch72/053-chat-sous-les-etoiles/_responsive/cover-480.webp.asset.json";
import asset471 from "@/assets/lens/batch72/053-chat-sous-les-etoiles/_responsive/cover-800.webp.asset.json";
import asset472 from "@/assets/lens/batch72/054-chat-roux-douillet/01-cover.webp.asset.json";
import asset473 from "@/assets/lens/batch72/054-chat-roux-douillet/02.webp.asset.json";
import asset474 from "@/assets/lens/batch72/054-chat-roux-douillet/03.webp.asset.json";
import asset475 from "@/assets/lens/batch72/054-chat-roux-douillet/04.webp.asset.json";
import asset476 from "@/assets/lens/batch72/054-chat-roux-douillet/05.webp.asset.json";
import asset477 from "@/assets/lens/batch72/054-chat-roux-douillet/06.webp.asset.json";
import asset478 from "@/assets/lens/batch72/054-chat-roux-douillet/07.webp.asset.json";
import asset479 from "@/assets/lens/batch72/054-chat-roux-douillet/_responsive/cover-480.webp.asset.json";
import asset480 from "@/assets/lens/batch72/054-chat-roux-douillet/_responsive/cover-800.webp.asset.json";
import asset481 from "@/assets/lens/batch72/055-trio-de-chats-curieux/01-cover.webp.asset.json";
import asset482 from "@/assets/lens/batch72/055-trio-de-chats-curieux/02.webp.asset.json";
import asset483 from "@/assets/lens/batch72/055-trio-de-chats-curieux/03.webp.asset.json";
import asset484 from "@/assets/lens/batch72/055-trio-de-chats-curieux/04.webp.asset.json";
import asset485 from "@/assets/lens/batch72/055-trio-de-chats-curieux/05.webp.asset.json";
import asset486 from "@/assets/lens/batch72/055-trio-de-chats-curieux/06.webp.asset.json";
import asset487 from "@/assets/lens/batch72/055-trio-de-chats-curieux/07.webp.asset.json";
import asset488 from "@/assets/lens/batch72/055-trio-de-chats-curieux/_responsive/cover-480.webp.asset.json";
import asset489 from "@/assets/lens/batch72/055-trio-de-chats-curieux/_responsive/cover-800.webp.asset.json";
import asset490 from "@/assets/lens/batch72/056-chat-cafe-zen/01-cover.webp.asset.json";
import asset491 from "@/assets/lens/batch72/056-chat-cafe-zen/02.webp.asset.json";
import asset492 from "@/assets/lens/batch72/056-chat-cafe-zen/03.webp.asset.json";
import asset493 from "@/assets/lens/batch72/056-chat-cafe-zen/04.webp.asset.json";
import asset494 from "@/assets/lens/batch72/056-chat-cafe-zen/05.webp.asset.json";
import asset495 from "@/assets/lens/batch72/056-chat-cafe-zen/06.webp.asset.json";
import asset496 from "@/assets/lens/batch72/056-chat-cafe-zen/07.webp.asset.json";
import asset497 from "@/assets/lens/batch72/056-chat-cafe-zen/_responsive/cover-480.webp.asset.json";
import asset498 from "@/assets/lens/batch72/056-chat-cafe-zen/_responsive/cover-800.webp.asset.json";
import asset499 from "@/assets/lens/batch72/057-chien-aux-lunettes-retro/01-cover.webp.asset.json";
import asset500 from "@/assets/lens/batch72/057-chien-aux-lunettes-retro/02.webp.asset.json";
import asset501 from "@/assets/lens/batch72/057-chien-aux-lunettes-retro/03.webp.asset.json";
import asset502 from "@/assets/lens/batch72/057-chien-aux-lunettes-retro/04.webp.asset.json";
import asset503 from "@/assets/lens/batch72/057-chien-aux-lunettes-retro/05.webp.asset.json";
import asset504 from "@/assets/lens/batch72/057-chien-aux-lunettes-retro/06.webp.asset.json";
import asset505 from "@/assets/lens/batch72/057-chien-aux-lunettes-retro/07.webp.asset.json";
import asset506 from "@/assets/lens/batch72/057-chien-aux-lunettes-retro/_responsive/cover-480.webp.asset.json";
import asset507 from "@/assets/lens/batch72/057-chien-aux-lunettes-retro/_responsive/cover-800.webp.asset.json";
import asset508 from "@/assets/lens/batch72/058-oie-en-or/01-cover.webp.asset.json";
import asset509 from "@/assets/lens/batch72/058-oie-en-or/02.webp.asset.json";
import asset510 from "@/assets/lens/batch72/058-oie-en-or/03.webp.asset.json";
import asset511 from "@/assets/lens/batch72/058-oie-en-or/04.webp.asset.json";
import asset512 from "@/assets/lens/batch72/058-oie-en-or/05.webp.asset.json";
import asset513 from "@/assets/lens/batch72/058-oie-en-or/06.webp.asset.json";
import asset514 from "@/assets/lens/batch72/058-oie-en-or/07.webp.asset.json";
import asset515 from "@/assets/lens/batch72/058-oie-en-or/_responsive/cover-480.webp.asset.json";
import asset516 from "@/assets/lens/batch72/058-oie-en-or/_responsive/cover-800.webp.asset.json";
import asset517 from "@/assets/lens/batch72/059-route-dautomne/01-cover.webp.asset.json";
import asset518 from "@/assets/lens/batch72/059-route-dautomne/02.webp.asset.json";
import asset519 from "@/assets/lens/batch72/059-route-dautomne/03.webp.asset.json";
import asset520 from "@/assets/lens/batch72/059-route-dautomne/04.webp.asset.json";
import asset521 from "@/assets/lens/batch72/059-route-dautomne/05.webp.asset.json";
import asset522 from "@/assets/lens/batch72/059-route-dautomne/06.webp.asset.json";
import asset523 from "@/assets/lens/batch72/059-route-dautomne/07.webp.asset.json";
import asset524 from "@/assets/lens/batch72/059-route-dautomne/_responsive/cover-480.webp.asset.json";
import asset525 from "@/assets/lens/batch72/059-route-dautomne/_responsive/cover-800.webp.asset.json";
import asset526 from "@/assets/lens/batch72/060-lune-ecarlate/01-cover.webp.asset.json";
import asset527 from "@/assets/lens/batch72/060-lune-ecarlate/02.webp.asset.json";
import asset528 from "@/assets/lens/batch72/060-lune-ecarlate/03.webp.asset.json";
import asset529 from "@/assets/lens/batch72/060-lune-ecarlate/04.webp.asset.json";
import asset530 from "@/assets/lens/batch72/060-lune-ecarlate/05.webp.asset.json";
import asset531 from "@/assets/lens/batch72/060-lune-ecarlate/06.webp.asset.json";
import asset532 from "@/assets/lens/batch72/060-lune-ecarlate/07.webp.asset.json";
import asset533 from "@/assets/lens/batch72/060-lune-ecarlate/_responsive/cover-480.webp.asset.json";
import asset534 from "@/assets/lens/batch72/060-lune-ecarlate/_responsive/cover-800.webp.asset.json";
import asset535 from "@/assets/lens/batch72/061-marguerite-ciel-bleu/01-cover.webp.asset.json";
import asset536 from "@/assets/lens/batch72/061-marguerite-ciel-bleu/02.webp.asset.json";
import asset537 from "@/assets/lens/batch72/061-marguerite-ciel-bleu/03.webp.asset.json";
import asset538 from "@/assets/lens/batch72/061-marguerite-ciel-bleu/04.webp.asset.json";
import asset539 from "@/assets/lens/batch72/061-marguerite-ciel-bleu/05.webp.asset.json";
import asset540 from "@/assets/lens/batch72/061-marguerite-ciel-bleu/06.webp.asset.json";
import asset541 from "@/assets/lens/batch72/061-marguerite-ciel-bleu/07.webp.asset.json";
import asset542 from "@/assets/lens/batch72/061-marguerite-ciel-bleu/_responsive/cover-480.webp.asset.json";
import asset543 from "@/assets/lens/batch72/061-marguerite-ciel-bleu/_responsive/cover-800.webp.asset.json";
import asset544 from "@/assets/lens/batch72/062-oeuf-soleil/01-cover.webp.asset.json";
import asset545 from "@/assets/lens/batch72/062-oeuf-soleil/02.webp.asset.json";
import asset546 from "@/assets/lens/batch72/062-oeuf-soleil/03.webp.asset.json";
import asset547 from "@/assets/lens/batch72/062-oeuf-soleil/04.webp.asset.json";
import asset548 from "@/assets/lens/batch72/062-oeuf-soleil/05.webp.asset.json";
import asset549 from "@/assets/lens/batch72/062-oeuf-soleil/06.webp.asset.json";
import asset550 from "@/assets/lens/batch72/062-oeuf-soleil/07.webp.asset.json";
import asset551 from "@/assets/lens/batch72/062-oeuf-soleil/_responsive/cover-480.webp.asset.json";
import asset552 from "@/assets/lens/batch72/062-oeuf-soleil/_responsive/cover-800.webp.asset.json";
import asset553 from "@/assets/lens/batch72/063-chat-pew-pew/01-cover.webp.asset.json";
import asset554 from "@/assets/lens/batch72/063-chat-pew-pew/02.webp.asset.json";
import asset555 from "@/assets/lens/batch72/063-chat-pew-pew/03.webp.asset.json";
import asset556 from "@/assets/lens/batch72/063-chat-pew-pew/04.webp.asset.json";
import asset557 from "@/assets/lens/batch72/063-chat-pew-pew/05.webp.asset.json";
import asset558 from "@/assets/lens/batch72/063-chat-pew-pew/06.webp.asset.json";
import asset559 from "@/assets/lens/batch72/063-chat-pew-pew/_responsive/cover-480.webp.asset.json";
import asset560 from "@/assets/lens/batch72/063-chat-pew-pew/_responsive/cover-800.webp.asset.json";
import asset561 from "@/assets/lens/batch72/064-chat-noir-curieux/01-cover.webp.asset.json";
import asset562 from "@/assets/lens/batch72/064-chat-noir-curieux/02.webp.asset.json";
import asset563 from "@/assets/lens/batch72/064-chat-noir-curieux/03.webp.asset.json";
import asset564 from "@/assets/lens/batch72/064-chat-noir-curieux/04.webp.asset.json";
import asset565 from "@/assets/lens/batch72/064-chat-noir-curieux/05.webp.asset.json";
import asset566 from "@/assets/lens/batch72/064-chat-noir-curieux/_responsive/cover-480.webp.asset.json";
import asset567 from "@/assets/lens/batch72/064-chat-noir-curieux/_responsive/cover-800.webp.asset.json";
import asset568 from "@/assets/lens/batch72/065-chat-sur-leau-bleue/01-cover.webp.asset.json";
import asset569 from "@/assets/lens/batch72/065-chat-sur-leau-bleue/02.webp.asset.json";
import asset570 from "@/assets/lens/batch72/065-chat-sur-leau-bleue/03.webp.asset.json";
import asset571 from "@/assets/lens/batch72/065-chat-sur-leau-bleue/04.webp.asset.json";
import asset572 from "@/assets/lens/batch72/065-chat-sur-leau-bleue/05.webp.asset.json";
import asset573 from "@/assets/lens/batch72/065-chat-sur-leau-bleue/06.webp.asset.json";
import asset574 from "@/assets/lens/batch72/065-chat-sur-leau-bleue/_responsive/cover-480.webp.asset.json";
import asset575 from "@/assets/lens/batch72/065-chat-sur-leau-bleue/_responsive/cover-800.webp.asset.json";
import asset576 from "@/assets/lens/batch72/066-crane-floral-pop/01-cover.webp.asset.json";
import asset577 from "@/assets/lens/batch72/066-crane-floral-pop/02.webp.asset.json";
import asset578 from "@/assets/lens/batch72/066-crane-floral-pop/03.webp.asset.json";
import asset579 from "@/assets/lens/batch72/066-crane-floral-pop/04.webp.asset.json";
import asset580 from "@/assets/lens/batch72/066-crane-floral-pop/05.webp.asset.json";
import asset581 from "@/assets/lens/batch72/066-crane-floral-pop/06.webp.asset.json";
import asset582 from "@/assets/lens/batch72/066-crane-floral-pop/_responsive/cover-480.webp.asset.json";
import asset583 from "@/assets/lens/batch72/066-crane-floral-pop/_responsive/cover-800.webp.asset.json";
import asset584 from "@/assets/lens/batch72/067-chat-tigre-elegant/01-cover.webp.asset.json";
import asset585 from "@/assets/lens/batch72/067-chat-tigre-elegant/02.webp.asset.json";
import asset586 from "@/assets/lens/batch72/067-chat-tigre-elegant/03.webp.asset.json";
import asset587 from "@/assets/lens/batch72/067-chat-tigre-elegant/04.webp.asset.json";
import asset588 from "@/assets/lens/batch72/067-chat-tigre-elegant/05.webp.asset.json";
import asset589 from "@/assets/lens/batch72/067-chat-tigre-elegant/06.webp.asset.json";
import asset590 from "@/assets/lens/batch72/067-chat-tigre-elegant/07.webp.asset.json";
import asset591 from "@/assets/lens/batch72/067-chat-tigre-elegant/_responsive/cover-480.webp.asset.json";
import asset592 from "@/assets/lens/batch72/067-chat-tigre-elegant/_responsive/cover-800.webp.asset.json";
import asset593 from "@/assets/lens/batch72/068-portrait-dore/01-cover.webp.asset.json";
import asset594 from "@/assets/lens/batch72/068-portrait-dore/02.webp.asset.json";
import asset595 from "@/assets/lens/batch72/068-portrait-dore/03.webp.asset.json";
import asset596 from "@/assets/lens/batch72/068-portrait-dore/04.webp.asset.json";
import asset597 from "@/assets/lens/batch72/068-portrait-dore/05.webp.asset.json";
import asset598 from "@/assets/lens/batch72/068-portrait-dore/06.webp.asset.json";
import asset599 from "@/assets/lens/batch72/068-portrait-dore/07.webp.asset.json";
import asset600 from "@/assets/lens/batch72/068-portrait-dore/_responsive/cover-480.webp.asset.json";
import asset601 from "@/assets/lens/batch72/068-portrait-dore/_responsive/cover-800.webp.asset.json";
import asset602 from "@/assets/lens/batch72/069-phare-sous-les-etoiles/01-cover.webp.asset.json";
import asset603 from "@/assets/lens/batch72/069-phare-sous-les-etoiles/02.webp.asset.json";
import asset604 from "@/assets/lens/batch72/069-phare-sous-les-etoiles/03.webp.asset.json";
import asset605 from "@/assets/lens/batch72/069-phare-sous-les-etoiles/04.webp.asset.json";
import asset606 from "@/assets/lens/batch72/069-phare-sous-les-etoiles/05.webp.asset.json";
import asset607 from "@/assets/lens/batch72/069-phare-sous-les-etoiles/06.webp.asset.json";
import asset608 from "@/assets/lens/batch72/069-phare-sous-les-etoiles/07.webp.asset.json";
import asset609 from "@/assets/lens/batch72/069-phare-sous-les-etoiles/_responsive/cover-480.webp.asset.json";
import asset610 from "@/assets/lens/batch72/069-phare-sous-les-etoiles/_responsive/cover-800.webp.asset.json";
import asset611 from "@/assets/lens/batch72/070-chat-momie/01-cover.webp.asset.json";
import asset612 from "@/assets/lens/batch72/070-chat-momie/02.webp.asset.json";
import asset613 from "@/assets/lens/batch72/070-chat-momie/03.webp.asset.json";
import asset614 from "@/assets/lens/batch72/070-chat-momie/04.webp.asset.json";
import asset615 from "@/assets/lens/batch72/070-chat-momie/05.webp.asset.json";
import asset616 from "@/assets/lens/batch72/070-chat-momie/06.webp.asset.json";
import asset617 from "@/assets/lens/batch72/070-chat-momie/07.webp.asset.json";
import asset618 from "@/assets/lens/batch72/070-chat-momie/_responsive/cover-480.webp.asset.json";
import asset619 from "@/assets/lens/batch72/070-chat-momie/_responsive/cover-800.webp.asset.json";
import asset620 from "@/assets/lens/batch72/071-chat-suspendu/01-cover.webp.asset.json";
import asset621 from "@/assets/lens/batch72/071-chat-suspendu/02.webp.asset.json";
import asset622 from "@/assets/lens/batch72/071-chat-suspendu/03.webp.asset.json";
import asset623 from "@/assets/lens/batch72/071-chat-suspendu/04.webp.asset.json";
import asset624 from "@/assets/lens/batch72/071-chat-suspendu/05.webp.asset.json";
import asset625 from "@/assets/lens/batch72/071-chat-suspendu/06.webp.asset.json";
import asset626 from "@/assets/lens/batch72/071-chat-suspendu/_responsive/cover-480.webp.asset.json";
import asset627 from "@/assets/lens/batch72/071-chat-suspendu/_responsive/cover-800.webp.asset.json";
import asset628 from "@/assets/lens/batch72/072-gorille-nouilles/01-cover.webp.asset.json";
import asset629 from "@/assets/lens/batch72/072-gorille-nouilles/02.webp.asset.json";
import asset630 from "@/assets/lens/batch72/072-gorille-nouilles/03.webp.asset.json";
import asset631 from "@/assets/lens/batch72/072-gorille-nouilles/04.webp.asset.json";
import asset632 from "@/assets/lens/batch72/072-gorille-nouilles/05.webp.asset.json";
import asset633 from "@/assets/lens/batch72/072-gorille-nouilles/06.webp.asset.json";
import asset634 from "@/assets/lens/batch72/072-gorille-nouilles/07.webp.asset.json";
import asset635 from "@/assets/lens/batch72/072-gorille-nouilles/_responsive/cover-480.webp.asset.json";
import asset636 from "@/assets/lens/batch72/072-gorille-nouilles/_responsive/cover-800.webp.asset.json";

export const CAMERA72_SKINS: CameraLensSkin[] = [
  {
    id: "skinup-camera-batch72-20261126-001", importKey: "skinup-camera-batch72-20261126-001", sku: "SK-CAM-B72-001", slug: "camera-comic-boom", sortOrder: 1,
    name: { fr: "Skin caméra – Comic Boom", en: "Comic Boom", ar: "Comic Boom" },
    description: { fr: "Collage de bande dessinée rouge, noir et crème, avec onomatopées et illustrations expressives.", en: "Collage de bande dessinée rouge, noir et crème, avec onomatopées et illustrations expressives.", ar: "Collage de bande dessinée rouge, noir et crème, avec onomatopées et illustrations expressives." },
    image: asset0.url, gallery: [asset0.url, asset1.url, asset2.url, asset3.url, asset4.url, asset5.url],
    responsiveCover: [{ url: asset6.url, width: 480, height: 480 }, { url: asset7.url, width: 800, height: 800 }, { url: asset0.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Comic Boom présenté sur deux téléphones", tags: ["bande dessinée", "rouge", "noir"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 72, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-002", importKey: "skinup-camera-batch72-20261126-002", sku: "SK-CAM-B72-002", slug: "camera-doodles-pop", sortOrder: 2,
    name: { fr: "Skin caméra – Doodles Pop", en: "Doodles Pop", ar: "Doodles Pop" },
    description: { fr: "Dessins spontanés en noir sur fond blanc, ponctués de touches colorées et de visages souriants.", en: "Dessins spontanés en noir sur fond blanc, ponctués de touches colorées et de visages souriants.", ar: "Dessins spontanés en noir sur fond blanc, ponctués de touches colorées et de visages souriants." },
    image: asset8.url, gallery: [asset8.url, asset9.url, asset10.url, asset11.url, asset12.url, asset13.url, asset14.url],
    responsiveCover: [{ url: asset15.url, width: 480, height: 480 }, { url: asset16.url, width: 800, height: 800 }, { url: asset8.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Doodles Pop présenté sur deux téléphones", tags: ["doodle", "blanc", "multicolore"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 71, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-003", importKey: "skinup-camera-batch72-20261126-003", sku: "SK-CAM-B72-003", slug: "camera-chat-bleu-tourbillon", sortOrder: 3,
    name: { fr: "Skin caméra – Chat Bleu Tourbillon", en: "Chat Bleu Tourbillon", ar: "Chat Bleu Tourbillon" },
    description: { fr: "Petit chat noir aux grands yeux clairs sur un fond bleu aux traits tourbillonnants.", en: "Petit chat noir aux grands yeux clairs sur un fond bleu aux traits tourbillonnants.", ar: "Petit chat noir aux grands yeux clairs sur un fond bleu aux traits tourbillonnants." },
    image: asset17.url, gallery: [asset17.url, asset18.url, asset19.url, asset20.url, asset21.url, asset22.url],
    responsiveCover: [{ url: asset23.url, width: 480, height: 480 }, { url: asset24.url, width: 800, height: 800 }, { url: asset17.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Chat Bleu Tourbillon présenté sur deux téléphones", tags: ["chat", "bleu", "illustration"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 70, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-004", importKey: "skinup-camera-batch72-20261126-004", sku: "SK-CAM-B72-004", slug: "camera-petite-faucheuse", sortOrder: 4,
    name: { fr: "Skin caméra – Petite Faucheuse", en: "Petite Faucheuse", ar: "Petite Faucheuse" },
    description: { fr: "Petite silhouette de faucheuse noire et blanche, accompagnée de sa faux sur fond blanc.", en: "Petite silhouette de faucheuse noire et blanche, accompagnée de sa faux sur fond blanc.", ar: "Petite silhouette de faucheuse noire et blanche, accompagnée de sa faux sur fond blanc." },
    image: asset25.url, gallery: [asset25.url, asset26.url, asset27.url, asset28.url, asset29.url, asset30.url, asset31.url],
    responsiveCover: [{ url: asset32.url, width: 480, height: 480 }, { url: asset33.url, width: 800, height: 800 }, { url: asset25.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Petite Faucheuse présenté sur deux téléphones", tags: ["faucheuse", "noir et blanc", "minimaliste"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 69, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-005", importKey: "skinup-camera-batch72-20261126-005", sku: "SK-CAM-B72-005", slug: "camera-noel-etoile", sortOrder: 5,
    name: { fr: "Skin caméra – Noël Étoilé", en: "Noël Étoilé", ar: "Noël Étoilé" },
    description: { fr: "Sapins blancs, étoiles dorées et flocons délicats sur un fond bleu nuit.", en: "Sapins blancs, étoiles dorées et flocons délicats sur un fond bleu nuit.", ar: "Sapins blancs, étoiles dorées et flocons délicats sur un fond bleu nuit." },
    image: asset34.url, gallery: [asset34.url, asset35.url, asset36.url, asset37.url, asset38.url, asset39.url, asset40.url],
    responsiveCover: [{ url: asset41.url, width: 480, height: 480 }, { url: asset42.url, width: 800, height: 800 }, { url: asset34.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Noël Étoilé présenté sur deux téléphones", tags: ["Noël", "sapin", "bleu nuit"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 68, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-006", importKey: "skinup-camera-batch72-20261126-006", sku: "SK-CAM-B72-006", slug: "camera-sapin-retro", sortOrder: 6,
    name: { fr: "Skin caméra – Sapin Rétro", en: "Sapin Rétro", ar: "Sapin Rétro" },
    description: { fr: "Sapin vert décoré et petits motifs de Noël, réunis dans une composition rétro sur fond crème.", en: "Sapin vert décoré et petits motifs de Noël, réunis dans une composition rétro sur fond crème.", ar: "Sapin vert décoré et petits motifs de Noël, réunis dans une composition rétro sur fond crème." },
    image: asset43.url, gallery: [asset43.url, asset44.url, asset45.url, asset46.url, asset47.url, asset48.url, asset49.url],
    responsiveCover: [{ url: asset50.url, width: 480, height: 480 }, { url: asset51.url, width: 800, height: 800 }, { url: asset43.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Sapin Rétro présenté sur deux téléphones", tags: ["Noël", "sapin", "rétro"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 67, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-007", importKey: "skinup-camera-batch72-20261126-007", sku: "SK-CAM-B72-007", slug: "camera-ordi-tricot", sortOrder: 7,
    name: { fr: "Skin caméra – Ordi Tricot", en: "Ordi Tricot", ar: "Ordi Tricot" },
    description: { fr: "Petit ordinateur rétro souriant dans un motif noir et blanc inspiré du tricot.", en: "Petit ordinateur rétro souriant dans un motif noir et blanc inspiré du tricot.", ar: "Petit ordinateur rétro souriant dans un motif noir et blanc inspiré du tricot." },
    image: asset52.url, gallery: [asset52.url, asset53.url, asset54.url, asset55.url, asset56.url, asset57.url, asset58.url],
    responsiveCover: [{ url: asset59.url, width: 480, height: 480 }, { url: asset60.url, width: 800, height: 800 }, { url: asset52.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Ordi Tricot présenté sur deux téléphones", tags: ["ordinateur", "rétro", "noir et blanc"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 66, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-008", importKey: "skinup-camera-batch72-20261126-008", sku: "SK-CAM-B72-008", slug: "camera-flocons-monochromes", sortOrder: 8,
    name: { fr: "Skin caméra – Flocons Monochromes", en: "Flocons Monochromes", ar: "Flocons Monochromes" },
    description: { fr: "Flocons blancs de différentes formes dispersés sur un fond noir.", en: "Flocons blancs de différentes formes dispersés sur un fond noir.", ar: "Flocons blancs de différentes formes dispersés sur un fond noir." },
    image: asset61.url, gallery: [asset61.url, asset62.url, asset63.url, asset64.url, asset65.url, asset66.url, asset67.url],
    responsiveCover: [{ url: asset68.url, width: 480, height: 480 }, { url: asset69.url, width: 800, height: 800 }, { url: asset61.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Flocons Monochromes présenté sur deux téléphones", tags: ["hiver", "flocons", "noir et blanc"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 65, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-009", importKey: "skinup-camera-batch72-20261126-009", sku: "SK-CAM-B72-009", slug: "camera-flocons-glaces", sortOrder: 9,
    name: { fr: "Skin caméra – Flocons Glacés", en: "Flocons Glacés", ar: "Flocons Glacés" },
    description: { fr: "Flocons bleu clair et turquoise sur un fond sombre parsemé de petits points.", en: "Flocons bleu clair et turquoise sur un fond sombre parsemé de petits points.", ar: "Flocons bleu clair et turquoise sur un fond sombre parsemé de petits points." },
    image: asset70.url, gallery: [asset70.url, asset71.url, asset72.url, asset73.url, asset74.url, asset75.url, asset76.url],
    responsiveCover: [{ url: asset77.url, width: 480, height: 480 }, { url: asset78.url, width: 800, height: 800 }, { url: asset70.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Flocons Glacés présenté sur deux téléphones", tags: ["hiver", "flocons", "turquoise"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 64, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-010", importKey: "skinup-camera-batch72-20261126-010", sku: "SK-CAM-B72-010", slug: "camera-flocons-cuivres", sortOrder: 10,
    name: { fr: "Skin caméra – Flocons Cuivrés", en: "Flocons Cuivrés", ar: "Flocons Cuivrés" },
    description: { fr: "Flocons aux tons cuivrés et bleu glacé sur un fond sombre.", en: "Flocons aux tons cuivrés et bleu glacé sur un fond sombre.", ar: "Flocons aux tons cuivrés et bleu glacé sur un fond sombre." },
    image: asset79.url, gallery: [asset79.url, asset80.url, asset81.url, asset82.url, asset83.url, asset84.url, asset85.url],
    responsiveCover: [{ url: asset86.url, width: 480, height: 480 }, { url: asset87.url, width: 800, height: 800 }, { url: asset79.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Flocons Cuivrés présenté sur deux téléphones", tags: ["hiver", "flocons", "cuivre"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 63, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-011", importKey: "skinup-camera-batch72-20261126-011", sku: "SK-CAM-B72-011", slug: "camera-pins-de-minuit", sortOrder: 11,
    name: { fr: "Skin caméra – Pins de Minuit", en: "Pins de Minuit", ar: "Pins de Minuit" },
    description: { fr: "Branches de pin bleues et dorées, pommes de pin et petites étoiles sur fond bleu nuit.", en: "Branches de pin bleues et dorées, pommes de pin et petites étoiles sur fond bleu nuit.", ar: "Branches de pin bleues et dorées, pommes de pin et petites étoiles sur fond bleu nuit." },
    image: asset88.url, gallery: [asset88.url, asset89.url, asset90.url, asset91.url, asset92.url, asset93.url, asset94.url],
    responsiveCover: [{ url: asset95.url, width: 480, height: 480 }, { url: asset96.url, width: 800, height: 800 }, { url: asset88.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Pins de Minuit présenté sur deux téléphones", tags: ["pin", "bleu nuit", "doré"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 62, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-012", importKey: "skinup-camera-batch72-20261126-012", sku: "SK-CAM-B72-012", slug: "camera-flocons-de-noel", sortOrder: 12,
    name: { fr: "Skin caméra – Flocons de Noël", en: "Flocons de Noël", ar: "Flocons de Noël" },
    description: { fr: "Grands flocons rouges et blancs, accompagnés de petites touches vertes sur fond noir.", en: "Grands flocons rouges et blancs, accompagnés de petites touches vertes sur fond noir.", ar: "Grands flocons rouges et blancs, accompagnés de petites touches vertes sur fond noir." },
    image: asset97.url, gallery: [asset97.url, asset98.url, asset99.url, asset100.url, asset101.url, asset102.url, asset103.url],
    responsiveCover: [{ url: asset104.url, width: 480, height: 480 }, { url: asset105.url, width: 800, height: 800 }, { url: asset97.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Flocons de Noël présenté sur deux téléphones", tags: ["Noël", "flocons", "rouge"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 61, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-013", importKey: "skinup-camera-batch72-20261126-013", sku: "SK-CAM-B72-013", slug: "camera-grenouille-chill", sortOrder: 13,
    name: { fr: "Skin caméra – Grenouille Chill", en: "Grenouille Chill", ar: "Grenouille Chill" },
    description: { fr: "Grenouille en lunettes de soleil et tee-shirt vert, tenant une boisson sur fond vert clair.", en: "Grenouille en lunettes de soleil et tee-shirt vert, tenant une boisson sur fond vert clair.", ar: "Grenouille en lunettes de soleil et tee-shirt vert, tenant une boisson sur fond vert clair." },
    image: asset106.url, gallery: [asset106.url, asset107.url, asset108.url, asset109.url, asset110.url, asset111.url, asset112.url],
    responsiveCover: [{ url: asset113.url, width: 480, height: 480 }, { url: asset114.url, width: 800, height: 800 }, { url: asset106.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Grenouille Chill présenté sur deux téléphones", tags: ["grenouille", "vert", "humour"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 60, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-014", importKey: "skinup-camera-batch72-20261126-014", sku: "SK-CAM-B72-014", slug: "camera-carpe-de-minuit", sortOrder: 14,
    name: { fr: "Skin caméra – Carpe de Minuit", en: "Carpe de Minuit", ar: "Carpe de Minuit" },
    description: { fr: "Carpe illustrée en blanc, gris et bleu, encadrée de motifs décoratifs sur fond bleu nuit.", en: "Carpe illustrée en blanc, gris et bleu, encadrée de motifs décoratifs sur fond bleu nuit.", ar: "Carpe illustrée en blanc, gris et bleu, encadrée de motifs décoratifs sur fond bleu nuit." },
    image: asset115.url, gallery: [asset115.url, asset116.url, asset117.url, asset118.url, asset119.url, asset120.url, asset121.url],
    responsiveCover: [{ url: asset122.url, width: 480, height: 480 }, { url: asset123.url, width: 800, height: 800 }, { url: asset115.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Carpe de Minuit présenté sur deux téléphones", tags: ["carpe", "bleu nuit", "illustration"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 59, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-015", importKey: "skinup-camera-batch72-20261126-015", sku: "SK-CAM-B72-015", slug: "camera-mosaique-orange", sortOrder: 15,
    name: { fr: "Skin caméra – Mosaïque Orange", en: "Mosaïque Orange", ar: "Mosaïque Orange" },
    description: { fr: "Composition géométrique de triangles, cercles et aplats orange, rouge, crème et noir.", en: "Composition géométrique de triangles, cercles et aplats orange, rouge, crème et noir.", ar: "Composition géométrique de triangles, cercles et aplats orange, rouge, crème et noir." },
    image: asset124.url, gallery: [asset124.url, asset125.url, asset126.url, asset127.url, asset128.url, asset129.url, asset130.url],
    responsiveCover: [{ url: asset131.url, width: 480, height: 480 }, { url: asset132.url, width: 800, height: 800 }, { url: asset124.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Mosaïque Orange présenté sur deux téléphones", tags: ["géométrique", "orange", "abstrait"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 58, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-016", importKey: "skinup-camera-batch72-20261126-016", sku: "SK-CAM-B72-016", slug: "camera-explosion-bd", sortOrder: 16,
    name: { fr: "Skin caméra – Explosion BD", en: "Explosion BD", ar: "Explosion BD" },
    description: { fr: "Collage énergique de bulles, éclairs et onomatopées dans des tons rouge, jaune et bleu.", en: "Collage énergique de bulles, éclairs et onomatopées dans des tons rouge, jaune et bleu.", ar: "Collage énergique de bulles, éclairs et onomatopées dans des tons rouge, jaune et bleu." },
    image: asset133.url, gallery: [asset133.url, asset134.url, asset135.url, asset136.url, asset137.url, asset138.url, asset139.url],
    responsiveCover: [{ url: asset140.url, width: 480, height: 480 }, { url: asset141.url, width: 800, height: 800 }, { url: asset133.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Explosion BD présenté sur deux téléphones", tags: ["bande dessinée", "pop art", "multicolore"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 57, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-017", importKey: "skinup-camera-batch72-20261126-017", sku: "SK-CAM-B72-017", slug: "camera-cassettes-retro", sortOrder: 17,
    name: { fr: "Skin caméra – Cassettes Rétro", en: "Cassettes Rétro", ar: "Cassettes Rétro" },
    description: { fr: "Accumulation de cassettes audio et de petits éléments graphiques dans des tons orange et bleu.", en: "Accumulation de cassettes audio et de petits éléments graphiques dans des tons orange et bleu.", ar: "Accumulation de cassettes audio et de petits éléments graphiques dans des tons orange et bleu." },
    image: asset142.url, gallery: [asset142.url, asset143.url, asset144.url, asset145.url, asset146.url, asset147.url, asset148.url],
    responsiveCover: [{ url: asset149.url, width: 480, height: 480 }, { url: asset150.url, width: 800, height: 800 }, { url: asset142.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Cassettes Rétro présenté sur deux téléphones", tags: ["cassette", "musique", "rétro"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 56, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-018", importKey: "skinup-camera-batch72-20261126-018", sku: "SK-CAM-B72-018", slug: "camera-dollars-vintage", sortOrder: 18,
    name: { fr: "Skin caméra – Dollars Vintage", en: "Dollars Vintage", ar: "Dollars Vintage" },
    description: { fr: "Collage de billets de dollars dans une palette crème, grise et noire.", en: "Collage de billets de dollars dans une palette crème, grise et noire.", ar: "Collage de billets de dollars dans une palette crème, grise et noire." },
    image: asset151.url, gallery: [asset151.url, asset152.url, asset153.url, asset154.url, asset155.url, asset156.url, asset157.url],
    responsiveCover: [{ url: asset158.url, width: 480, height: 480 }, { url: asset159.url, width: 800, height: 800 }, { url: asset151.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Dollars Vintage présenté sur deux téléphones", tags: ["dollar", "collage", "vintage"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 55, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-019", importKey: "skinup-camera-batch72-20261126-019", sku: "SK-CAM-B72-019", slug: "camera-sourire-orange", sortOrder: 19,
    name: { fr: "Skin caméra – Sourire Orange", en: "Sourire Orange", ar: "Sourire Orange" },
    description: { fr: "Un personnage souriant orange se détache parmi une foule de silhouettes grises sur fond noir.", en: "Un personnage souriant orange se détache parmi une foule de silhouettes grises sur fond noir.", ar: "Un personnage souriant orange se détache parmi une foule de silhouettes grises sur fond noir." },
    image: asset160.url, gallery: [asset160.url, asset161.url, asset162.url, asset163.url, asset164.url, asset165.url, asset166.url],
    responsiveCover: [{ url: asset167.url, width: 480, height: 480 }, { url: asset168.url, width: 800, height: 800 }, { url: asset160.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Sourire Orange présenté sur deux téléphones", tags: ["sourire", "orange", "illustration"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 54, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-020", importKey: "skinup-camera-batch72-20261126-020", sku: "SK-CAM-B72-020", slug: "camera-crane-graffiti", sortOrder: 20,
    name: { fr: "Skin caméra – Crâne Graffiti", en: "Crâne Graffiti", ar: "Crâne Graffiti" },
    description: { fr: "Crâne dessiné au cœur d'un collage urbain noir et gris, marqué de touches roses, bleues et jaunes.", en: "Crâne dessiné au cœur d'un collage urbain noir et gris, marqué de touches roses, bleues et jaunes.", ar: "Crâne dessiné au cœur d'un collage urbain noir et gris, marqué de touches roses, bleues et jaunes." },
    image: asset169.url, gallery: [asset169.url, asset170.url, asset171.url, asset172.url, asset173.url, asset174.url, asset175.url],
    responsiveCover: [{ url: asset176.url, width: 480, height: 480 }, { url: asset177.url, width: 800, height: 800 }, { url: asset169.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Crâne Graffiti présenté sur deux téléphones", tags: ["crâne", "graffiti", "multicolore"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 53, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-021", importKey: "skinup-camera-batch72-20261126-021", sku: "SK-CAM-B72-021", slug: "camera-mur-vintage", sortOrder: 21,
    name: { fr: "Skin caméra – Mur Vintage", en: "Mur Vintage", ar: "Mur Vintage" },
    description: { fr: "Assemblage de petites étiquettes, affiches et inscriptions rétro dans des tons crème, noir et orange.", en: "Assemblage de petites étiquettes, affiches et inscriptions rétro dans des tons crème, noir et orange.", ar: "Assemblage de petites étiquettes, affiches et inscriptions rétro dans des tons crème, noir et orange." },
    image: asset178.url, gallery: [asset178.url, asset179.url, asset180.url, asset181.url, asset182.url, asset183.url, asset184.url],
    responsiveCover: [{ url: asset185.url, width: 480, height: 480 }, { url: asset186.url, width: 800, height: 800 }, { url: asset178.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Mur Vintage présenté sur deux téléphones", tags: ["collage", "vintage", "typographie"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 52, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-022", importKey: "skinup-camera-batch72-20261126-022", sku: "SK-CAM-B72-022", slug: "camera-tags-sepia", sortOrder: 22,
    name: { fr: "Skin caméra – Tags Sépia", en: "Tags Sépia", ar: "Tags Sépia" },
    description: { fr: "Superposition de graffitis, inscriptions et textures beige et noires, relevées de touches rouges.", en: "Superposition de graffitis, inscriptions et textures beige et noires, relevées de touches rouges.", ar: "Superposition de graffitis, inscriptions et textures beige et noires, relevées de touches rouges." },
    image: asset187.url, gallery: [asset187.url, asset188.url, asset189.url, asset190.url, asset191.url, asset192.url, asset193.url],
    responsiveCover: [{ url: asset194.url, width: 480, height: 480 }, { url: asset195.url, width: 800, height: 800 }, { url: asset187.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Tags Sépia présenté sur deux téléphones", tags: ["graffiti", "beige", "rouge"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 51, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-023", importKey: "skinup-camera-batch72-20261126-023", sku: "SK-CAM-B72-023", slug: "camera-dollars-cartoon", sortOrder: 23,
    name: { fr: "Skin caméra – Dollars Cartoon", en: "Dollars Cartoon", ar: "Dollars Cartoon" },
    description: { fr: "Billets illustrés et visages expressifs dans un collage vert pâle, crème et noir.", en: "Billets illustrés et visages expressifs dans un collage vert pâle, crème et noir.", ar: "Billets illustrés et visages expressifs dans un collage vert pâle, crème et noir." },
    image: asset196.url, gallery: [asset196.url, asset197.url, asset198.url, asset199.url, asset200.url, asset201.url, asset202.url],
    responsiveCover: [{ url: asset203.url, width: 480, height: 480 }, { url: asset204.url, width: 800, height: 800 }, { url: asset196.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Dollars Cartoon présenté sur deux téléphones", tags: ["dollar", "cartoon", "vert"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 50, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-024", importKey: "skinup-camera-batch72-20261126-024", sku: "SK-CAM-B72-024", slug: "camera-lapin-pop-jaune", sortOrder: 24,
    name: { fr: "Skin caméra – Lapin Pop Jaune", en: "Lapin Pop Jaune", ar: "Lapin Pop Jaune" },
    description: { fr: "Grand lapin blanc stylisé sur un fond jaune animé de petits dessins et de détails noirs.", en: "Grand lapin blanc stylisé sur un fond jaune animé de petits dessins et de détails noirs.", ar: "Grand lapin blanc stylisé sur un fond jaune animé de petits dessins et de détails noirs." },
    image: asset205.url, gallery: [asset205.url, asset206.url, asset207.url, asset208.url, asset209.url, asset210.url, asset211.url],
    responsiveCover: [{ url: asset212.url, width: 480, height: 480 }, { url: asset213.url, width: 800, height: 800 }, { url: asset205.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Lapin Pop Jaune présenté sur deux téléphones", tags: ["lapin", "jaune", "pop art"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 49, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-025", importKey: "skinup-camera-batch72-20261126-025", sku: "SK-CAM-B72-025", slug: "camera-chat-de-minuit", sortOrder: 25,
    name: { fr: "Skin caméra – Chat de Minuit", en: "Chat de Minuit", ar: "Chat de Minuit" },
    description: { fr: "Un chat tigré aux yeux attentifs sur un fond noir profond.", en: "Un chat tigré aux yeux attentifs sur un fond noir profond.", ar: "Un chat tigré aux yeux attentifs sur un fond noir profond." },
    image: asset214.url, gallery: [asset214.url, asset215.url, asset216.url, asset217.url, asset218.url, asset219.url, asset220.url],
    responsiveCover: [{ url: asset221.url, width: 480, height: 480 }, { url: asset222.url, width: 800, height: 800 }, { url: asset214.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Chat de Minuit présenté sur deux téléphones", tags: ["chat", "noir", "animal"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 48, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-026", importKey: "skinup-camera-batch72-20261126-026", sku: "SK-CAM-B72-026", slug: "camera-graffiti-chromatique", sortOrder: 26,
    name: { fr: "Skin caméra – Graffiti Chromatique", en: "Graffiti Chromatique", ar: "Graffiti Chromatique" },
    description: { fr: "Un mélange de traits et de lettres façon graffiti dans des tons bleus, violets et verts.", en: "Un mélange de traits et de lettres façon graffiti dans des tons bleus, violets et verts.", ar: "Un mélange de traits et de lettres façon graffiti dans des tons bleus, violets et verts." },
    image: asset223.url, gallery: [asset223.url, asset224.url, asset225.url, asset226.url, asset227.url, asset228.url, asset229.url],
    responsiveCover: [{ url: asset230.url, width: 480, height: 480 }, { url: asset231.url, width: 800, height: 800 }, { url: asset223.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Graffiti Chromatique présenté sur deux téléphones", tags: ["graffiti", "multicolore", "urbain"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 47, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-027", importKey: "skinup-camera-batch72-20261126-027", sku: "SK-CAM-B72-027", slug: "camera-petit-gorille", sortOrder: 27,
    name: { fr: "Skin caméra – Petit Gorille", en: "Petit Gorille", ar: "Petit Gorille" },
    description: { fr: "Un petit gorille illustré sous une banane jaune, sur fond noir.", en: "Un petit gorille illustré sous une banane jaune, sur fond noir.", ar: "Un petit gorille illustré sous une banane jaune, sur fond noir." },
    image: asset232.url, gallery: [asset232.url, asset233.url, asset234.url, asset235.url, asset236.url, asset237.url],
    responsiveCover: [{ url: asset238.url, width: 480, height: 480 }, { url: asset239.url, width: 800, height: 800 }, { url: asset232.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Petit Gorille présenté sur deux téléphones", tags: ["gorille", "illustration", "noir"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 46, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-028", importKey: "skinup-camera-batch72-20261126-028", sku: "SK-CAM-B72-028", slug: "camera-noel-en-contours", sortOrder: 28,
    name: { fr: "Skin caméra – Noël en Contours", en: "Noël en Contours", ar: "Noël en Contours" },
    description: { fr: "Des sapins, des cadeaux et un bonhomme en pain d'épice dessinés en contours clairs et rouges sur fond noir.", en: "Des sapins, des cadeaux et un bonhomme en pain d'épice dessinés en contours clairs et rouges sur fond noir.", ar: "Des sapins, des cadeaux et un bonhomme en pain d'épice dessinés en contours clairs et rouges sur fond noir." },
    image: asset240.url, gallery: [asset240.url, asset241.url, asset242.url, asset243.url, asset244.url, asset245.url, asset246.url],
    responsiveCover: [{ url: asset247.url, width: 480, height: 480 }, { url: asset248.url, width: 800, height: 800 }, { url: asset240.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Noël en Contours présenté sur deux téléphones", tags: ["noël", "motifs", "noir"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 45, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-029", importKey: "skinup-camera-batch72-20261126-029", sku: "SK-CAM-B72-029", slug: "camera-rennes-joyeux", sortOrder: 29,
    name: { fr: "Skin caméra – Rennes Joyeux", en: "Rennes Joyeux", ar: "Rennes Joyeux" },
    description: { fr: "Une répétition de rennes au nez rouge et de petits détails de Noël sur fond beige.", en: "Une répétition de rennes au nez rouge et de petits détails de Noël sur fond beige.", ar: "Une répétition de rennes au nez rouge et de petits détails de Noël sur fond beige." },
    image: asset249.url, gallery: [asset249.url, asset250.url, asset251.url, asset252.url, asset253.url, asset254.url, asset255.url],
    responsiveCover: [{ url: asset256.url, width: 480, height: 480 }, { url: asset257.url, width: 800, height: 800 }, { url: asset249.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Rennes Joyeux présenté sur deux téléphones", tags: ["noël", "rennes", "beige"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 44, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-030", importKey: "skinup-camera-batch72-20261126-030", sku: "SK-CAM-B72-030", slug: "camera-barbe-de-noel", sortOrder: 30,
    name: { fr: "Skin caméra – Barbe de Noël", en: "Barbe de Noël", ar: "Barbe de Noël" },
    description: { fr: "Un bonnet rouge et une barbe blanche composent un Père Noël minimaliste sur fond noir.", en: "Un bonnet rouge et une barbe blanche composent un Père Noël minimaliste sur fond noir.", ar: "Un bonnet rouge et une barbe blanche composent un Père Noël minimaliste sur fond noir." },
    image: asset258.url, gallery: [asset258.url, asset259.url, asset260.url, asset261.url, asset262.url, asset263.url, asset264.url],
    responsiveCover: [{ url: asset265.url, width: 480, height: 480 }, { url: asset266.url, width: 800, height: 800 }, { url: asset258.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Barbe de Noël présenté sur deux téléphones", tags: ["noël", "père noël", "minimaliste"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 43, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-031", importKey: "skinup-camera-batch72-20261126-031", sku: "SK-CAM-B72-031", slug: "camera-cadeaux-emeraude", sortOrder: 31,
    name: { fr: "Skin caméra – Cadeaux Émeraude", en: "Cadeaux Émeraude", ar: "Cadeaux Émeraude" },
    description: { fr: "Des paquets cadeaux verts ornés de rubans dorés sur un fond sombre.", en: "Des paquets cadeaux verts ornés de rubans dorés sur un fond sombre.", ar: "Des paquets cadeaux verts ornés de rubans dorés sur un fond sombre." },
    image: asset267.url, gallery: [asset267.url, asset268.url, asset269.url, asset270.url, asset271.url, asset272.url, asset273.url],
    responsiveCover: [{ url: asset274.url, width: 480, height: 480 }, { url: asset275.url, width: 800, height: 800 }, { url: asset267.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Cadeaux Émeraude présenté sur deux téléphones", tags: ["noël", "cadeaux", "vert"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 42, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-032", importKey: "skinup-camera-batch72-20261126-032", sku: "SK-CAM-B72-032", slug: "camera-noel-bleu-neon", sortOrder: 32,
    name: { fr: "Skin caméra – Noël Bleu Néon", en: "Noël Bleu Néon", ar: "Noël Bleu Néon" },
    description: { fr: "Des cadeaux, des sapins et des motifs de Noël en contours bleu lumineux sur fond sombre.", en: "Des cadeaux, des sapins et des motifs de Noël en contours bleu lumineux sur fond sombre.", ar: "Des cadeaux, des sapins et des motifs de Noël en contours bleu lumineux sur fond sombre." },
    image: asset276.url, gallery: [asset276.url, asset277.url, asset278.url, asset279.url, asset280.url],
    responsiveCover: [{ url: asset281.url, width: 480, height: 480 }, { url: asset282.url, width: 800, height: 800 }, { url: asset276.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Noël Bleu Néon présenté sur deux téléphones", tags: ["noël", "bleu", "néon"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 41, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-033", importKey: "skinup-camera-batch72-20261126-033", sku: "SK-CAM-B72-033", slug: "camera-cranes-de-noel", sortOrder: 33,
    name: { fr: "Skin caméra – Crânes de Noël", en: "Crânes de Noël", ar: "Crânes de Noël" },
    description: { fr: "Des crânes coiffés de bonnets de Noël rouges dans une composition noire, blanche et rouge.", en: "Des crânes coiffés de bonnets de Noël rouges dans une composition noire, blanche et rouge.", ar: "Des crânes coiffés de bonnets de Noël rouges dans une composition noire, blanche et rouge." },
    image: asset283.url, gallery: [asset283.url, asset284.url, asset285.url, asset286.url, asset287.url, asset288.url, asset289.url],
    responsiveCover: [{ url: asset290.url, width: 480, height: 480 }, { url: asset291.url, width: 800, height: 800 }, { url: asset283.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Crânes de Noël présenté sur deux téléphones", tags: ["noël", "crâne", "rouge"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 40, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-034", importKey: "skinup-camera-batch72-20261126-034", sku: "SK-CAM-B72-034", slug: "camera-renne-celeste", sortOrder: 34,
    name: { fr: "Skin caméra – Renne Céleste", en: "Renne Céleste", ar: "Renne Céleste" },
    description: { fr: "Un renne bondissant entouré d'étoiles et d'ornements clairs sur un fond bleu nuit.", en: "Un renne bondissant entouré d'étoiles et d'ornements clairs sur un fond bleu nuit.", ar: "Un renne bondissant entouré d'étoiles et d'ornements clairs sur un fond bleu nuit." },
    image: asset292.url, gallery: [asset292.url, asset293.url, asset294.url, asset295.url, asset296.url, asset297.url, asset298.url],
    responsiveCover: [{ url: asset299.url, width: 480, height: 480 }, { url: asset300.url, width: 800, height: 800 }, { url: asset292.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Renne Céleste présenté sur deux téléphones", tags: ["renne", "étoiles", "bleu nuit"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 39, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-035", importKey: "skinup-camera-batch72-20261126-035", sku: "SK-CAM-B72-035", slug: "camera-chat-pinceau", sortOrder: 35,
    name: { fr: "Skin caméra – Chat Pinceau", en: "Chat Pinceau", ar: "Chat Pinceau" },
    description: { fr: "Un chat noir et blanc tout en longueur, accompagné de pinceaux sur un fond orange et bleu grisé.", en: "Un chat noir et blanc tout en longueur, accompagné de pinceaux sur un fond orange et bleu grisé.", ar: "Un chat noir et blanc tout en longueur, accompagné de pinceaux sur un fond orange et bleu grisé." },
    image: asset301.url, gallery: [asset301.url, asset302.url, asset303.url, asset304.url, asset305.url, asset306.url, asset307.url],
    responsiveCover: [{ url: asset308.url, width: 480, height: 480 }, { url: asset309.url, width: 800, height: 800 }, { url: asset301.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Chat Pinceau présenté sur deux téléphones", tags: ["chat", "illustration", "orange"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 38, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-036", importKey: "skinup-camera-batch72-20261126-036", sku: "SK-CAM-B72-036", slug: "camera-chat-roux-geometrique", sortOrder: 36,
    name: { fr: "Skin caméra – Chat Roux Géométrique", en: "Chat Roux Géométrique", ar: "Chat Roux Géométrique" },
    description: { fr: "Un chat roux aux formes anguleuses et au regard amusé sur fond crème.", en: "Un chat roux aux formes anguleuses et au regard amusé sur fond crème.", ar: "Un chat roux aux formes anguleuses et au regard amusé sur fond crème." },
    image: asset310.url, gallery: [asset310.url, asset311.url, asset312.url, asset313.url, asset314.url, asset315.url, asset316.url],
    responsiveCover: [{ url: asset317.url, width: 480, height: 480 }, { url: asset318.url, width: 800, height: 800 }, { url: asset310.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Chat Roux Géométrique présenté sur deux téléphones", tags: ["chat", "géométrique", "roux"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 37, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-037", importKey: "skinup-camera-batch72-20261126-037", sku: "SK-CAM-B72-037", slug: "camera-touche-evasion", sortOrder: 37,
    name: { fr: "Skin caméra – Touche Évasion", en: "Touche Évasion", ar: "Touche Évasion" },
    description: { fr: "Une petite touche de clavier jaune se détache sur un fond bleu intense.", en: "Une petite touche de clavier jaune se détache sur un fond bleu intense.", ar: "Une petite touche de clavier jaune se détache sur un fond bleu intense." },
    image: asset319.url, gallery: [asset319.url, asset320.url, asset321.url, asset322.url, asset323.url, asset324.url, asset325.url],
    responsiveCover: [{ url: asset326.url, width: 480, height: 480 }, { url: asset327.url, width: 800, height: 800 }, { url: asset319.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Touche Évasion présenté sur deux téléphones", tags: ["clavier", "minimaliste", "bleu"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 36, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-038", importKey: "skinup-camera-batch72-20261126-038", sku: "SK-CAM-B72-038", slug: "camera-mode-active", sortOrder: 38,
    name: { fr: "Skin caméra – Mode Activé", en: "Mode Activé", ar: "Mode Activé" },
    description: { fr: "Un petit interrupteur vert portant l'inscription ON sur un fond noir épuré.", en: "Un petit interrupteur vert portant l'inscription ON sur un fond noir épuré.", ar: "Un petit interrupteur vert portant l'inscription ON sur un fond noir épuré." },
    image: asset328.url, gallery: [asset328.url, asset329.url, asset330.url, asset331.url, asset332.url, asset333.url, asset334.url],
    responsiveCover: [{ url: asset335.url, width: 480, height: 480 }, { url: asset336.url, width: 800, height: 800 }, { url: asset328.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Mode Activé présenté sur deux téléphones", tags: ["interrupteur", "minimaliste", "vert"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 35, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-039", importKey: "skinup-camera-batch72-20261126-039", sku: "SK-CAM-B72-039", slug: "camera-chat-au-bandana", sortOrder: 39,
    name: { fr: "Skin caméra – Chat au Bandana", en: "Chat au Bandana", ar: "Chat au Bandana" },
    description: { fr: "Un chat noir et blanc portant un bandana rouge sur un fond crème.", en: "Un chat noir et blanc portant un bandana rouge sur un fond crème.", ar: "Un chat noir et blanc portant un bandana rouge sur un fond crème." },
    image: asset337.url, gallery: [asset337.url, asset338.url, asset339.url, asset340.url, asset341.url, asset342.url, asset343.url],
    responsiveCover: [{ url: asset344.url, width: 480, height: 480 }, { url: asset345.url, width: 800, height: 800 }, { url: asset337.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Chat au Bandana présenté sur deux téléphones", tags: ["chat", "bandana", "rouge"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 34, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-040", importKey: "skinup-camera-batch72-20261126-040", sku: "SK-CAM-B72-040", slug: "camera-portrait-carmin", sortOrder: 40,
    name: { fr: "Skin caméra – Portrait Carmin", en: "Portrait Carmin", ar: "Portrait Carmin" },
    description: { fr: "Un portrait féminin aux cheveux courts et aux reflets rouges sur fond noir.", en: "Un portrait féminin aux cheveux courts et aux reflets rouges sur fond noir.", ar: "Un portrait féminin aux cheveux courts et aux reflets rouges sur fond noir." },
    image: asset346.url, gallery: [asset346.url, asset347.url, asset348.url, asset349.url, asset350.url, asset351.url, asset352.url],
    responsiveCover: [{ url: asset353.url, width: 480, height: 480 }, { url: asset354.url, width: 800, height: 800 }, { url: asset346.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Portrait Carmin présenté sur deux téléphones", tags: ["portrait", "rouge", "illustration"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 33, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-041", importKey: "skinup-camera-batch72-20261126-041", sku: "SK-CAM-B72-041", slug: "camera-portrait-argente", sortOrder: 41,
    name: { fr: "Skin caméra – Portrait Argenté", en: "Portrait Argenté", ar: "Portrait Argenté" },
    description: { fr: "Un portrait féminin aux cheveux argentés, souligné de nuances rouges et turquoise sur fond sombre.", en: "Un portrait féminin aux cheveux argentés, souligné de nuances rouges et turquoise sur fond sombre.", ar: "Un portrait féminin aux cheveux argentés, souligné de nuances rouges et turquoise sur fond sombre." },
    image: asset355.url, gallery: [asset355.url, asset356.url, asset357.url, asset358.url, asset359.url, asset360.url, asset361.url],
    responsiveCover: [{ url: asset362.url, width: 480, height: 480 }, { url: asset363.url, width: 800, height: 800 }, { url: asset355.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Portrait Argenté présenté sur deux téléphones", tags: ["portrait", "argenté", "turquoise"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 32, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-042", importKey: "skinup-camera-batch72-20261126-042", sku: "SK-CAM-B72-042", slug: "camera-silhouette-urbaine", sortOrder: 42,
    name: { fr: "Skin caméra – Silhouette Urbaine", en: "Silhouette Urbaine", ar: "Silhouette Urbaine" },
    description: { fr: "Une jeune femme en sweat à capuche noir sur un fond jaune vif.", en: "Une jeune femme en sweat à capuche noir sur un fond jaune vif.", ar: "Une jeune femme en sweat à capuche noir sur un fond jaune vif." },
    image: asset364.url, gallery: [asset364.url, asset365.url, asset366.url, asset367.url, asset368.url, asset369.url, asset370.url],
    responsiveCover: [{ url: asset371.url, width: 480, height: 480 }, { url: asset372.url, width: 800, height: 800 }, { url: asset364.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Silhouette Urbaine présenté sur deux téléphones", tags: ["portrait", "urbain", "jaune"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 31, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-043", importKey: "skinup-camera-batch72-20261126-043", sku: "SK-CAM-B72-043", slug: "camera-monstre-pixel", sortOrder: 43,
    name: { fr: "Skin caméra – Monstre Pixel", en: "Monstre Pixel", ar: "Monstre Pixel" },
    description: { fr: "Un petit monstre sombre au style pixelisé, la gueule ouverte, sur fond crème.", en: "Un petit monstre sombre au style pixelisé, la gueule ouverte, sur fond crème.", ar: "Un petit monstre sombre au style pixelisé, la gueule ouverte, sur fond crème." },
    image: asset373.url, gallery: [asset373.url, asset374.url, asset375.url, asset376.url, asset377.url, asset378.url, asset379.url],
    responsiveCover: [{ url: asset380.url, width: 480, height: 480 }, { url: asset381.url, width: 800, height: 800 }, { url: asset373.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Monstre Pixel présenté sur deux téléphones", tags: ["monstre", "pixel", "illustration"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 30, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-044", importKey: "skinup-camera-batch72-20261126-044", sku: "SK-CAM-B72-044", slug: "camera-vol-dans-les-nuages", sortOrder: 44,
    name: { fr: "Skin caméra – Vol dans les Nuages", en: "Vol dans les Nuages", ar: "Vol dans les Nuages" },
    description: { fr: "Un avion vu du dessus au milieu d'un ciel bleu parcouru de nuages blancs.", en: "Un avion vu du dessus au milieu d'un ciel bleu parcouru de nuages blancs.", ar: "Un avion vu du dessus au milieu d'un ciel bleu parcouru de nuages blancs." },
    image: asset382.url, gallery: [asset382.url, asset383.url, asset384.url, asset385.url, asset386.url, asset387.url, asset388.url],
    responsiveCover: [{ url: asset389.url, width: 480, height: 480 }, { url: asset390.url, width: 800, height: 800 }, { url: asset382.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Vol dans les Nuages présenté sur deux téléphones", tags: ["avion", "ciel", "bleu"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 29, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-045", importKey: "skinup-camera-batch72-20261126-045", sku: "SK-CAM-B72-045", slug: "camera-vol-sur-la-foret-blanche", sortOrder: 45,
    name: { fr: "Skin caméra – Vol sur la Forêt Blanche", en: "Vol sur la Forêt Blanche", ar: "Vol sur la Forêt Blanche" },
    description: { fr: "Un avion rouge survole une forêt de conifères couverts de neige.", en: "Un avion rouge survole une forêt de conifères couverts de neige.", ar: "Un avion rouge survole une forêt de conifères couverts de neige." },
    image: asset391.url, gallery: [asset391.url, asset392.url, asset393.url, asset394.url, asset395.url, asset396.url, asset397.url],
    responsiveCover: [{ url: asset398.url, width: 480, height: 480 }, { url: asset399.url, width: 800, height: 800 }, { url: asset391.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Vol sur la Forêt Blanche présenté sur deux téléphones", tags: ["avion", "forêt", "hiver"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 28, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-046", importKey: "skinup-camera-batch72-20261126-046", sku: "SK-CAM-B72-046", slug: "camera-oies-curieuses", sortOrder: 46,
    name: { fr: "Skin caméra – Oies Curieuses", en: "Oies Curieuses", ar: "Oies Curieuses" },
    description: { fr: "Deux oies blanches au bec orange apparaissent sur un fond turquoise.", en: "Deux oies blanches au bec orange apparaissent sur un fond turquoise.", ar: "Deux oies blanches au bec orange apparaissent sur un fond turquoise." },
    image: asset400.url, gallery: [asset400.url, asset401.url, asset402.url, asset403.url, asset404.url, asset405.url, asset406.url],
    responsiveCover: [{ url: asset407.url, width: 480, height: 480 }, { url: asset408.url, width: 800, height: 800 }, { url: asset400.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Oies Curieuses présenté sur deux téléphones", tags: ["oies", "animal", "turquoise"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 27, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-047", importKey: "skinup-camera-batch72-20261126-047", sku: "SK-CAM-B72-047", slug: "camera-petit-monstre-bouh", sortOrder: 47,
    name: { fr: "Skin caméra – Petit Monstre Bouh", en: "Petit Monstre Bouh", ar: "Petit Monstre Bouh" },
    description: { fr: "Un petit monstre jaune et bleu accompagné de l'inscription Boo. sur fond gris bleuté.", en: "Un petit monstre jaune et bleu accompagné de l'inscription Boo. sur fond gris bleuté.", ar: "Un petit monstre jaune et bleu accompagné de l'inscription Boo. sur fond gris bleuté." },
    image: asset409.url, gallery: [asset409.url, asset410.url, asset411.url, asset412.url, asset413.url, asset414.url, asset415.url],
    responsiveCover: [{ url: asset416.url, width: 480, height: 480 }, { url: asset417.url, width: 800, height: 800 }, { url: asset409.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Petit Monstre Bouh présenté sur deux téléphones", tags: ["monstre", "illustration", "jaune"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 26, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-048", importKey: "skinup-camera-batch72-20261126-048", sku: "SK-CAM-B72-048", slug: "camera-grenouille-detente", sortOrder: 48,
    name: { fr: "Skin caméra – Grenouille Détente", en: "Grenouille Détente", ar: "Grenouille Détente" },
    description: { fr: "Une grenouille en lunettes de soleil tient une boisson sur un fond vert clair.", en: "Une grenouille en lunettes de soleil tient une boisson sur un fond vert clair.", ar: "Une grenouille en lunettes de soleil tient une boisson sur un fond vert clair." },
    image: asset418.url, gallery: [asset418.url, asset419.url, asset420.url, asset421.url, asset422.url, asset423.url, asset424.url],
    responsiveCover: [{ url: asset425.url, width: 480, height: 480 }, { url: asset426.url, width: 800, height: 800 }, { url: asset418.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Grenouille Détente présenté sur deux téléphones", tags: ["grenouille", "illustration", "vert"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 25, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-049", importKey: "skinup-camera-batch72-20261126-049", sku: "SK-CAM-B72-049", slug: "camera-coq-tricolore", sortOrder: 49,
    name: { fr: "Skin caméra – Coq Tricolore", en: "Coq Tricolore", ar: "Coq Tricolore" },
    description: { fr: "Un coq rouge sur une bande blanche et rouge façon coup de pinceau, sur fond noir.", en: "Un coq rouge sur une bande blanche et rouge façon coup de pinceau, sur fond noir.", ar: "Un coq rouge sur une bande blanche et rouge façon coup de pinceau, sur fond noir." },
    image: asset427.url, gallery: [asset427.url, asset428.url, asset429.url, asset430.url, asset431.url, asset432.url, asset433.url],
    responsiveCover: [{ url: asset434.url, width: 480, height: 480 }, { url: asset435.url, width: 800, height: 800 }, { url: asset427.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Coq Tricolore présenté sur deux téléphones", tags: ["coq", "tricolore", "noir"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 24, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-050", importKey: "skinup-camera-batch72-20261126-050", sku: "SK-CAM-B72-050", slug: "camera-graffiti-fusion", sortOrder: 50,
    name: { fr: "Skin caméra – Graffiti Fusion", en: "Graffiti Fusion", ar: "Graffiti Fusion" },
    description: { fr: "Des formes graffiti entrelacées aux couleurs vives, du rose au jaune en passant par le bleu.", en: "Des formes graffiti entrelacées aux couleurs vives, du rose au jaune en passant par le bleu.", ar: "Des formes graffiti entrelacées aux couleurs vives, du rose au jaune en passant par le bleu." },
    image: asset436.url, gallery: [asset436.url, asset437.url, asset438.url, asset439.url, asset440.url, asset441.url, asset442.url],
    responsiveCover: [{ url: asset443.url, width: 480, height: 480 }, { url: asset444.url, width: 800, height: 800 }, { url: asset436.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Graffiti Fusion présenté sur deux téléphones", tags: ["graffiti", "multicolore", "urbain"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 23, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-051", importKey: "skinup-camera-batch72-20261126-051", sku: "SK-CAM-B72-051", slug: "camera-collage-punk", sortOrder: 51,
    name: { fr: "Skin caméra – Collage Punk", en: "Collage Punk", ar: "Collage Punk" },
    description: { fr: "Un collage de petits symboles, d’étiquettes et de dessins aux accents punk dans des tons noirs, crème et rouges.", en: "Un collage de petits symboles, d’étiquettes et de dessins aux accents punk dans des tons noirs, crème et rouges.", ar: "Un collage de petits symboles, d’étiquettes et de dessins aux accents punk dans des tons noirs, crème et rouges." },
    image: asset445.url, gallery: [asset445.url, asset446.url, asset447.url, asset448.url, asset449.url, asset450.url, asset451.url],
    responsiveCover: [{ url: asset452.url, width: 480, height: 480 }, { url: asset453.url, width: 800, height: 800 }, { url: asset445.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Collage Punk présenté sur deux téléphones", tags: ["collage", "punk", "vintage"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 22, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-052", importKey: "skinup-camera-batch72-20261126-052", sku: "SK-CAM-B72-052", slug: "camera-typo-pop", sortOrder: 52,
    name: { fr: "Skin caméra – Typo Pop", en: "Typo Pop", ar: "Typo Pop" },
    description: { fr: "De grandes lettres et formes graphiques multicolores composent un motif typographique sur fond noir.", en: "De grandes lettres et formes graphiques multicolores composent un motif typographique sur fond noir.", ar: "De grandes lettres et formes graphiques multicolores composent un motif typographique sur fond noir." },
    image: asset454.url, gallery: [asset454.url, asset455.url, asset456.url, asset457.url, asset458.url, asset459.url, asset460.url],
    responsiveCover: [{ url: asset461.url, width: 480, height: 480 }, { url: asset462.url, width: 800, height: 800 }, { url: asset454.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Typo Pop présenté sur deux téléphones", tags: ["typographie", "multicolore", "pop art"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 21, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-053", importKey: "skinup-camera-batch72-20261126-053", sku: "SK-CAM-B72-053", slug: "camera-chat-sous-les-etoiles", sortOrder: 53,
    name: { fr: "Skin caméra – Chat sous les Étoiles", en: "Chat sous les Étoiles", ar: "Chat sous les Étoiles" },
    description: { fr: "Un chat tricolore allongé sur une couverture rose étoilée, sur un fond bleu pastel.", en: "Un chat tricolore allongé sur une couverture rose étoilée, sur un fond bleu pastel.", ar: "Un chat tricolore allongé sur une couverture rose étoilée, sur un fond bleu pastel." },
    image: asset463.url, gallery: [asset463.url, asset464.url, asset465.url, asset466.url, asset467.url, asset468.url, asset469.url],
    responsiveCover: [{ url: asset470.url, width: 480, height: 480 }, { url: asset471.url, width: 800, height: 800 }, { url: asset463.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Chat sous les Étoiles présenté sur deux téléphones", tags: ["chat", "étoiles", "pastel"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 20, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-054", importKey: "skinup-camera-batch72-20261126-054", sku: "SK-CAM-B72-054", slug: "camera-chat-roux-douillet", sortOrder: 54,
    name: { fr: "Skin caméra – Chat Roux Douillet", en: "Chat Roux Douillet", ar: "Chat Roux Douillet" },
    description: { fr: "Un petit chat roux et crème s’étire sur un fond orange chaleureux.", en: "Un petit chat roux et crème s’étire sur un fond orange chaleureux.", ar: "Un petit chat roux et crème s’étire sur un fond orange chaleureux." },
    image: asset472.url, gallery: [asset472.url, asset473.url, asset474.url, asset475.url, asset476.url, asset477.url, asset478.url],
    responsiveCover: [{ url: asset479.url, width: 480, height: 480 }, { url: asset480.url, width: 800, height: 800 }, { url: asset472.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Chat Roux Douillet présenté sur deux téléphones", tags: ["chat", "roux", "orange"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 19, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-055", importKey: "skinup-camera-batch72-20261126-055", sku: "SK-CAM-B72-055", slug: "camera-trio-de-chats-curieux", sortOrder: 55,
    name: { fr: "Skin caméra – Trio de Chats Curieux", en: "Trio de Chats Curieux", ar: "Trio de Chats Curieux" },
    description: { fr: "Trois chats superposés apparaissent au bord d’une bande orange sur fond bleu profond.", en: "Trois chats superposés apparaissent au bord d’une bande orange sur fond bleu profond.", ar: "Trois chats superposés apparaissent au bord d’une bande orange sur fond bleu profond." },
    image: asset481.url, gallery: [asset481.url, asset482.url, asset483.url, asset484.url, asset485.url, asset486.url, asset487.url],
    responsiveCover: [{ url: asset488.url, width: 480, height: 480 }, { url: asset489.url, width: 800, height: 800 }, { url: asset481.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Trio de Chats Curieux présenté sur deux téléphones", tags: ["chats", "bleu", "orange"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 18, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-056", importKey: "skinup-camera-batch72-20261126-056", sku: "SK-CAM-B72-056", slug: "camera-chat-cafe-zen", sortOrder: 56,
    name: { fr: "Skin caméra – Chat Café Zen", en: "Chat Café Zen", ar: "Chat Café Zen" },
    description: { fr: "Un chat noir aux yeux fermés se tient derrière une tasse de café sur fond bleu sombre.", en: "Un chat noir aux yeux fermés se tient derrière une tasse de café sur fond bleu sombre.", ar: "Un chat noir aux yeux fermés se tient derrière une tasse de café sur fond bleu sombre." },
    image: asset490.url, gallery: [asset490.url, asset491.url, asset492.url, asset493.url, asset494.url, asset495.url, asset496.url],
    responsiveCover: [{ url: asset497.url, width: 480, height: 480 }, { url: asset498.url, width: 800, height: 800 }, { url: asset490.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Chat Café Zen présenté sur deux téléphones", tags: ["chat", "café", "bleu nuit"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 17, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-057", importKey: "skinup-camera-batch72-20261126-057", sku: "SK-CAM-B72-057", slug: "camera-chien-aux-lunettes-retro", sortOrder: 57,
    name: { fr: "Skin caméra – Chien aux Lunettes Rétro", en: "Chien aux Lunettes Rétro", ar: "Chien aux Lunettes Rétro" },
    description: { fr: "Un chien porte de grandes lunettes rondes turquoise sur un fond vert texturé.", en: "Un chien porte de grandes lunettes rondes turquoise sur un fond vert texturé.", ar: "Un chien porte de grandes lunettes rondes turquoise sur un fond vert texturé." },
    image: asset499.url, gallery: [asset499.url, asset500.url, asset501.url, asset502.url, asset503.url, asset504.url, asset505.url],
    responsiveCover: [{ url: asset506.url, width: 480, height: 480 }, { url: asset507.url, width: 800, height: 800 }, { url: asset499.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Chien aux Lunettes Rétro présenté sur deux téléphones", tags: ["chien", "lunettes", "turquoise"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 16, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-058", importKey: "skinup-camera-batch72-20261126-058", sku: "SK-CAM-B72-058", slug: "camera-oie-en-or", sortOrder: 58,
    name: { fr: "Skin caméra – Oie en Or", en: "Oie en Or", ar: "Oie en Or" },
    description: { fr: "Une oie blanche porte des lunettes de soleil et une chaîne dorée sur fond bordeaux.", en: "Une oie blanche porte des lunettes de soleil et une chaîne dorée sur fond bordeaux.", ar: "Une oie blanche porte des lunettes de soleil et une chaîne dorée sur fond bordeaux." },
    image: asset508.url, gallery: [asset508.url, asset509.url, asset510.url, asset511.url, asset512.url, asset513.url, asset514.url],
    responsiveCover: [{ url: asset515.url, width: 480, height: 480 }, { url: asset516.url, width: 800, height: 800 }, { url: asset508.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Oie en Or présenté sur deux téléphones", tags: ["oie", "lunettes", "bordeaux"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 15, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-059", importKey: "skinup-camera-batch72-20261126-059", sku: "SK-CAM-B72-059", slug: "camera-route-dautomne", sortOrder: 59,
    name: { fr: "Skin caméra – Route d’Automne", en: "Route d’Automne", ar: "Route d’Automne" },
    description: { fr: "Une route sinueuse traverse une forêt dorée sous un ciel sombre parcouru de nuages.", en: "Une route sinueuse traverse une forêt dorée sous un ciel sombre parcouru de nuages.", ar: "Une route sinueuse traverse une forêt dorée sous un ciel sombre parcouru de nuages." },
    image: asset517.url, gallery: [asset517.url, asset518.url, asset519.url, asset520.url, asset521.url, asset522.url, asset523.url],
    responsiveCover: [{ url: asset524.url, width: 480, height: 480 }, { url: asset525.url, width: 800, height: 800 }, { url: asset517.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Route d’Automne présenté sur deux téléphones", tags: ["paysage", "automne", "doré"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 14, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-060", importKey: "skinup-camera-batch72-20261126-060", sku: "SK-CAM-B72-060", slug: "camera-lune-ecarlate", sortOrder: 60,
    name: { fr: "Skin caméra – Lune Écarlate", en: "Lune Écarlate", ar: "Lune Écarlate" },
    description: { fr: "Une lune lumineuse domine une forêt sombre et un lac aux reflets rouges.", en: "Une lune lumineuse domine une forêt sombre et un lac aux reflets rouges.", ar: "Une lune lumineuse domine une forêt sombre et un lac aux reflets rouges." },
    image: asset526.url, gallery: [asset526.url, asset527.url, asset528.url, asset529.url, asset530.url, asset531.url, asset532.url],
    responsiveCover: [{ url: asset533.url, width: 480, height: 480 }, { url: asset534.url, width: 800, height: 800 }, { url: asset526.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Lune Écarlate présenté sur deux téléphones", tags: ["paysage", "lune", "rouge"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 13, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-061", importKey: "skinup-camera-batch72-20261126-061", sku: "SK-CAM-B72-061", slug: "camera-marguerite-ciel-bleu", sortOrder: 61,
    name: { fr: "Skin caméra – Marguerite Ciel Bleu", en: "Marguerite Ciel Bleu", ar: "Marguerite Ciel Bleu" },
    description: { fr: "Une fleur blanche au cœur doré se détache sur un fond bleu ciel épuré.", en: "Une fleur blanche au cœur doré se détache sur un fond bleu ciel épuré.", ar: "Une fleur blanche au cœur doré se détache sur un fond bleu ciel épuré." },
    image: asset535.url, gallery: [asset535.url, asset536.url, asset537.url, asset538.url, asset539.url, asset540.url, asset541.url],
    responsiveCover: [{ url: asset542.url, width: 480, height: 480 }, { url: asset543.url, width: 800, height: 800 }, { url: asset535.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Marguerite Ciel Bleu présenté sur deux téléphones", tags: ["fleur", "bleu ciel", "minimaliste"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 12, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-062", importKey: "skinup-camera-batch72-20261126-062", sku: "SK-CAM-B72-062", slug: "camera-oeuf-soleil", sortOrder: 62,
    name: { fr: "Skin caméra – Œuf Soleil", en: "Œuf Soleil", ar: "Œuf Soleil" },
    description: { fr: "Un petit œuf au plat souriant sur un fond bleu clair, accompagné de détails crème.", en: "Un petit œuf au plat souriant sur un fond bleu clair, accompagné de détails crème.", ar: "Un petit œuf au plat souriant sur un fond bleu clair, accompagné de détails crème." },
    image: asset544.url, gallery: [asset544.url, asset545.url, asset546.url, asset547.url, asset548.url, asset549.url, asset550.url],
    responsiveCover: [{ url: asset551.url, width: 480, height: 480 }, { url: asset552.url, width: 800, height: 800 }, { url: asset544.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Œuf Soleil présenté sur deux téléphones", tags: ["œuf", "humour", "bleu ciel"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 11, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-063", importKey: "skinup-camera-batch72-20261126-063", sku: "SK-CAM-B72-063", slug: "camera-chat-pew-pew", sortOrder: 63,
    name: { fr: "Skin caméra – Chat Pew Pew", en: "Chat Pew Pew", ar: "Chat Pew Pew" },
    description: { fr: "Un chat noir lève deux petits pistolets sous l’inscription PEW PEW sur fond gris clair.", en: "Un chat noir lève deux petits pistolets sous l’inscription PEW PEW sur fond gris clair.", ar: "Un chat noir lève deux petits pistolets sous l’inscription PEW PEW sur fond gris clair." },
    image: asset553.url, gallery: [asset553.url, asset554.url, asset555.url, asset556.url, asset557.url, asset558.url],
    responsiveCover: [{ url: asset559.url, width: 480, height: 480 }, { url: asset560.url, width: 800, height: 800 }, { url: asset553.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Chat Pew Pew présenté sur deux téléphones", tags: ["chat", "humour", "noir et blanc"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 10, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-064", importKey: "skinup-camera-batch72-20261126-064", sku: "SK-CAM-B72-064", slug: "camera-chat-noir-curieux", sortOrder: 64,
    name: { fr: "Skin caméra – Chat Noir Curieux", en: "Chat Noir Curieux", ar: "Chat Noir Curieux" },
    description: { fr: "Un chat noir au long cou et aux grands yeux blancs sur un fond orange vif.", en: "Un chat noir au long cou et aux grands yeux blancs sur un fond orange vif.", ar: "Un chat noir au long cou et aux grands yeux blancs sur un fond orange vif." },
    image: asset561.url, gallery: [asset561.url, asset562.url, asset563.url, asset564.url, asset565.url],
    responsiveCover: [{ url: asset566.url, width: 480, height: 480 }, { url: asset567.url, width: 800, height: 800 }, { url: asset561.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Chat Noir Curieux présenté sur deux téléphones", tags: ["chat", "minimaliste", "orange"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 9, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-065", importKey: "skinup-camera-batch72-20261126-065", sku: "SK-CAM-B72-065", slug: "camera-chat-sur-leau-bleue", sortOrder: 65,
    name: { fr: "Skin caméra – Chat sur l’Eau Bleue", en: "Chat sur l’Eau Bleue", ar: "Chat sur l’Eau Bleue" },
    description: { fr: "Un petit chat noir aux yeux clairs au milieu de traits bleus tourbillonnants et de cercles sur l’eau.", en: "Un petit chat noir aux yeux clairs au milieu de traits bleus tourbillonnants et de cercles sur l’eau.", ar: "Un petit chat noir aux yeux clairs au milieu de traits bleus tourbillonnants et de cercles sur l’eau." },
    image: asset568.url, gallery: [asset568.url, asset569.url, asset570.url, asset571.url, asset572.url, asset573.url],
    responsiveCover: [{ url: asset574.url, width: 480, height: 480 }, { url: asset575.url, width: 800, height: 800 }, { url: asset568.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Chat sur l’Eau Bleue présenté sur deux téléphones", tags: ["chat", "bleu", "illustration"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 8, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-066", importKey: "skinup-camera-batch72-20261126-066", sku: "SK-CAM-B72-066", slug: "camera-crane-floral-pop", sortOrder: 66,
    name: { fr: "Skin caméra – Crâne Floral Pop", en: "Crâne Floral Pop", ar: "Crâne Floral Pop" },
    description: { fr: "Un crâne coloré décoré de fleurs blanches au milieu d’éclaboussures rouges, bleues et jaunes.", en: "Un crâne coloré décoré de fleurs blanches au milieu d’éclaboussures rouges, bleues et jaunes.", ar: "Un crâne coloré décoré de fleurs blanches au milieu d’éclaboussures rouges, bleues et jaunes." },
    image: asset576.url, gallery: [asset576.url, asset577.url, asset578.url, asset579.url, asset580.url, asset581.url],
    responsiveCover: [{ url: asset582.url, width: 480, height: 480 }, { url: asset583.url, width: 800, height: 800 }, { url: asset576.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Crâne Floral Pop présenté sur deux téléphones", tags: ["crâne", "fleurs", "multicolore"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 7, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-067", importKey: "skinup-camera-batch72-20261126-067", sku: "SK-CAM-B72-067", slug: "camera-chat-tigre-elegant", sortOrder: 67,
    name: { fr: "Skin caméra – Chat Tigré Élégant", en: "Chat Tigré Élégant", ar: "Chat Tigré Élégant" },
    description: { fr: "Un chat tigré au regard levé se détache en nuances de gris sur un fond noir.", en: "Un chat tigré au regard levé se détache en nuances de gris sur un fond noir.", ar: "Un chat tigré au regard levé se détache en nuances de gris sur un fond noir." },
    image: asset584.url, gallery: [asset584.url, asset585.url, asset586.url, asset587.url, asset588.url, asset589.url, asset590.url],
    responsiveCover: [{ url: asset591.url, width: 480, height: 480 }, { url: asset592.url, width: 800, height: 800 }, { url: asset584.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Chat Tigré Élégant présenté sur deux téléphones", tags: ["chat", "gris", "noir"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 6, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-068", importKey: "skinup-camera-batch72-20261126-068", sku: "SK-CAM-B72-068", slug: "camera-portrait-dore", sortOrder: 68,
    name: { fr: "Skin caméra – Portrait Doré", en: "Portrait Doré", ar: "Portrait Doré" },
    description: { fr: "Un portrait féminin aux mèches dorées, aux lèvres rouges et aux lunettes teintées sur fond noir.", en: "Un portrait féminin aux mèches dorées, aux lèvres rouges et aux lunettes teintées sur fond noir.", ar: "Un portrait féminin aux mèches dorées, aux lèvres rouges et aux lunettes teintées sur fond noir." },
    image: asset593.url, gallery: [asset593.url, asset594.url, asset595.url, asset596.url, asset597.url, asset598.url, asset599.url],
    responsiveCover: [{ url: asset600.url, width: 480, height: 480 }, { url: asset601.url, width: 800, height: 800 }, { url: asset593.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Portrait Doré présenté sur deux téléphones", tags: ["portrait", "doré", "noir"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 5, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-069", importKey: "skinup-camera-batch72-20261126-069", sku: "SK-CAM-B72-069", slug: "camera-phare-sous-les-etoiles", sortOrder: 69,
    name: { fr: "Skin caméra – Phare sous les Étoiles", en: "Phare sous les Étoiles", ar: "Phare sous les Étoiles" },
    description: { fr: "Un phare sur une côte rocheuse sous un ciel étoilé aux tourbillons bleus et dorés.", en: "Un phare sur une côte rocheuse sous un ciel étoilé aux tourbillons bleus et dorés.", ar: "Un phare sur une côte rocheuse sous un ciel étoilé aux tourbillons bleus et dorés." },
    image: asset602.url, gallery: [asset602.url, asset603.url, asset604.url, asset605.url, asset606.url, asset607.url, asset608.url],
    responsiveCover: [{ url: asset609.url, width: 480, height: 480 }, { url: asset610.url, width: 800, height: 800 }, { url: asset602.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Phare sous les Étoiles présenté sur deux téléphones", tags: ["paysage", "phare", "nuit"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 4, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-070", importKey: "skinup-camera-batch72-20261126-070", sku: "SK-CAM-B72-070", slug: "camera-chat-momie", sortOrder: 70,
    name: { fr: "Skin caméra – Chat Momie", en: "Chat Momie", ar: "Chat Momie" },
    description: { fr: "Un chat enveloppé de bandelettes lève les pattes sur un fond bleu nuit.", en: "Un chat enveloppé de bandelettes lève les pattes sur un fond bleu nuit.", ar: "Un chat enveloppé de bandelettes lève les pattes sur un fond bleu nuit." },
    image: asset611.url, gallery: [asset611.url, asset612.url, asset613.url, asset614.url, asset615.url, asset616.url, asset617.url],
    responsiveCover: [{ url: asset618.url, width: 480, height: 480 }, { url: asset619.url, width: 800, height: 800 }, { url: asset611.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Chat Momie présenté sur deux téléphones", tags: ["chat", "momie", "humour"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 3, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-071", importKey: "skinup-camera-batch72-20261126-071", sku: "SK-CAM-B72-071", slug: "camera-chat-suspendu", sortOrder: 71,
    name: { fr: "Skin caméra – Chat Suspendu", en: "Chat Suspendu", ar: "Chat Suspendu" },
    description: { fr: "Un chat noir glisse les pattes en l’air en laissant des griffures sur un fond orange.", en: "Un chat noir glisse les pattes en l’air en laissant des griffures sur un fond orange.", ar: "Un chat noir glisse les pattes en l’air en laissant des griffures sur un fond orange." },
    image: asset620.url, gallery: [asset620.url, asset621.url, asset622.url, asset623.url, asset624.url, asset625.url],
    responsiveCover: [{ url: asset626.url, width: 480, height: 480 }, { url: asset627.url, width: 800, height: 800 }, { url: asset620.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Chat Suspendu présenté sur deux téléphones", tags: ["chat", "humour", "orange"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 2, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
  {
    id: "skinup-camera-batch72-20261126-072", importKey: "skinup-camera-batch72-20261126-072", sku: "SK-CAM-B72-072", slug: "camera-gorille-nouilles", sortOrder: 72,
    name: { fr: "Skin caméra – Gorille Nouilles", en: "Gorille Nouilles", ar: "Gorille Nouilles" },
    description: { fr: "Un gorille tient un bol de nouilles et des baguettes sur un fond noir.", en: "Un gorille tient un bol de nouilles et des baguettes sur un fond noir.", ar: "Un gorille tient un bol de nouilles et des baguettes sur un fond noir." },
    image: asset628.url, gallery: [asset628.url, asset629.url, asset630.url, asset631.url, asset632.url, asset633.url, asset634.url],
    responsiveCover: [{ url: asset635.url, width: 480, height: 480 }, { url: asset636.url, width: 800, height: 800 }, { url: asset628.url, width: 1200, height: 1200 }], imageWidth: 1200, imageHeight: 1200, altFr: "Skin caméra Gorille Nouilles présenté sur deux téléphones", tags: ["gorille", "nouilles", "humour"],
    category: "camera-lens-skins", device: "iPhone 17 Pro Max", inStock: true, isNew: false,
    popularity: 1, imagePresentation: "full-phone", scopeNote: CAMERA_ONLY_NOTE,
  },
];

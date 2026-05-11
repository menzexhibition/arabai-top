#!/usr/bin/env python3
from __future__ import annotations

import os
import subprocess
import textwrap
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
OUT_DIR = ASSETS / "tutorials"
CARD_DIR = OUT_DIR / "cards"
CLIP_DIR = OUT_DIR / "clips"

W = 1280
H = 720
FPS = 25

FONT_BOLD = "/System/Library/Fonts/Supplemental/Verdana Bold.ttf"
FONT_REGULAR = "/System/Library/Fonts/Supplemental/Verdana.ttf"


@dataclass
class Segment:
    source: str
    seconds: float
    subtitle_ar: str
    source_type: str = "image"


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True, cwd=ROOT)


def ensure_dirs() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    CARD_DIR.mkdir(parents=True, exist_ok=True)
    CLIP_DIR.mkdir(parents=True, exist_ok=True)


def load_font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def wrap(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
      trial = word if not current else f"{current} {word}"
      width = draw.textbbox((0, 0), trial, font=font)[2]
      if width <= max_width:
          current = trial
      else:
          if current:
              lines.append(current)
          current = word
    if current:
        lines.append(current)
    return lines


def make_card(filename: str, title: str, lines: list[str], accent: str = "#008c95", badge: str = "ARABAI VIDEO") -> Path:
    img = Image.new("RGB", (W, H), "#f7f6f2")
    draw = ImageDraw.Draw(img)
    bold = load_font(FONT_BOLD, 58)
    regular = load_font(FONT_REGULAR, 32)
    small = load_font(FONT_BOLD, 22)

    draw.rounded_rectangle((72, 72, W - 72, H - 72), radius=24, fill="#fffefa", outline="#e3e0d7", width=3)
    draw.rounded_rectangle((96, 96, 340, 142), radius=16, fill=accent)
    draw.text((120, 106), badge, font=small, fill="#ffffff")
    draw.rectangle((96, 176, 116, H - 120), fill=accent)
    draw.text((152, 176), title, font=bold, fill="#1f2523")

    y = 286
    max_width = W - 240
    for paragraph in lines:
        for line in wrap(draw, paragraph, regular, max_width):
            draw.text((152, y), line, font=regular, fill="#4e5a55")
            y += 46
        y += 16

    path = CARD_DIR / filename
    img.save(path)
    return path


def ts(total_seconds: float) -> str:
    ms_total = int(round(total_seconds * 1000))
    hours = ms_total // 3_600_000
    ms_total %= 3_600_000
    minutes = ms_total // 60_000
    ms_total %= 60_000
    seconds = ms_total // 1000
    millis = ms_total % 1000
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}.{millis:03d}"


def write_vtt(filename: str, segments: list[Segment]) -> Path:
    path = OUT_DIR / filename
    current = 0.0
    parts = ["WEBVTT", ""]
    for idx, segment in enumerate(segments, start=1):
        start = current
        current += segment.seconds
        parts.append(str(idx))
        parts.append(f"{ts(start)} --> {ts(current)}")
        parts.append(segment.subtitle_ar)
        parts.append("")
    path.write_text("\n".join(parts), encoding="utf-8")
    return path


def make_image_clip(src: Path, out: Path, seconds: float) -> None:
    run([
        "ffmpeg", "-y",
        "-loop", "1",
        "-t", f"{seconds}",
        "-i", str(src),
        "-vf", "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=#f7f6f2",
        "-r", str(FPS),
        "-pix_fmt", "yuv420p",
        str(out),
    ])


def make_video_clip(src: Path, out: Path, seconds: float | None = None) -> None:
    cmd = [
        "ffmpeg", "-y",
        "-i", str(src),
        "-vf", "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=#111514",
        "-r", str(FPS),
        "-pix_fmt", "yuv420p",
    ]
    if seconds is not None:
        cmd[2:2] = ["-t", f"{seconds}"]
    cmd.append(str(out))
    run(cmd)


def concat_video(filename: str, clip_paths: list[Path]) -> Path:
    manifest = CLIP_DIR / f"{filename}.txt"
    manifest.write_text("\n".join(f"file '{clip.name}'" for clip in clip_paths), encoding="utf-8")
    out = OUT_DIR / filename
    run([
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", str(manifest),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-an",
        str(out),
    ])
    return out


def build_segments() -> dict[str, list[Segment]]:
    gamma_card = make_card(
        "gamma-intro.png",
        "Gamma PPT Tutorial",
        [
            "Goal: make one clean 6-slide business deck.",
            "Method: open Gamma, paste one clear English prompt, review the outline, generate, then export.",
        ],
        accent="#008c95",
    )
    image_card = make_card(
        "image-intro.png",
        "Image Poster Tutorial",
        [
            "Goal: make one sale poster with image-2.",
            "Method: write a clear product prompt, check the text, then fix only layout or wording if needed.",
        ],
        accent="#d6a84f",
    )
    video_card = make_card(
        "video-intro.png",
        "Short Video Tutorial",
        [
            "Goal: make one promo video with the easy method.",
            "Method: text to image, 9-scene storyboard, then stitch into one short video.",
        ],
        accent="#4f8a5b",
    )
    api_card_1 = make_card(
        "api-official-01.png",
        "Official API Purchase",
        [
            "Choose one official provider first.",
            "Open the pricing page and confirm the model you actually need: chat, image, video, or audio.",
        ],
        accent="#008c95",
        badge="OFFICIAL API FLOW",
    )
    api_card_2 = make_card(
        "api-official-02.png",
        "Create Account And Billing",
        [
            "Create the official account.",
            "Add billing only after you understand monthly limits, refunds, and test budget.",
        ],
        accent="#008c95",
        badge="OFFICIAL API FLOW",
    )
    api_card_3 = make_card(
        "api-official-03.png",
        "Create API Key",
        [
            "Create one test key.",
            "Store it on the server only. Never paste a real API key into the public webpage.",
        ],
        accent="#008c95",
        badge="OFFICIAL API FLOW",
    )
    api_card_4 = make_card(
        "api-official-04.png",
        "Connect And Test",
        [
            "Connect the key to one safe test route.",
            "Run one small request, check logs, cost, and final result before opening it to users.",
        ],
        accent="#008c95",
        badge="OFFICIAL API FLOW",
    )
    wallet_card_1 = make_card(
        "wallet-01.png",
        "ARABAI Wallet Simulation",
        [
            "This tutorial shows the planned user flow before public recharge opens.",
            "Users read free content first, then see one simple wallet instead of many AI accounts.",
        ],
        accent="#b86f45",
        badge="ARABAI CREDIT FLOW",
    )
    wallet_card_2 = make_card(
        "wallet-02.png",
        "Choose A Credit Pack",
        [
            "User chooses a small pack such as 10, 20, or 50 dollars.",
            "The page explains jobs, not token math: chat, image, video, or slide tasks.",
        ],
        accent="#b86f45",
        badge="ARABAI CREDIT FLOW",
    )
    wallet_card_3 = make_card(
        "wallet-03.png",
        "Spend Credits By Task",
        [
            "The user picks a tool task from one place.",
            "ARABAI routes the request in the background and shows the result with the credit cost clearly recorded.",
        ],
        accent="#b86f45",
        badge="ARABAI CREDIT FLOW",
    )
    wallet_card_4 = make_card(
        "wallet-04.png",
        "Keep It Transparent",
        [
            "Credits, history, and remaining balance should stay visible.",
            "This flow should replace the simulation with real recording when recharge opens.",
        ],
        accent="#b86f45",
        badge="ARABAI CREDIT FLOW",
    )

    return {
        "gamma-ppt-tutorial": [
            Segment(str(gamma_card.relative_to(ROOT)), 4, "في هذا الدرس سنفتح Gamma ونصنع عرضا من ست شرائح بخطوات واضحة جدا."),
            Segment("assets/screenshots/gamma/04-english-prompt-filled.png", 5, "هذه أول خطوة. نكتب الطلب كاملا بالإنجليزية، مع الموضوع والجمهور وعدد الشرائح."),
            Segment("assets/screenshots/gamma/05-english-outline-generated.png", 5, "بعدها يعطينا Gamma مخططا أوليا. هنا نتأكد أن ترتيب الأفكار منطقي قبل التوليد."),
            Segment("assets/screenshots/gamma/06-six-cards-before-generate.png", 4, "قبل الضغط على Generate، نراجع أن عدد البطاقات ست بطاقات فعلا."),
            Segment("assets/screenshots/gamma/07-english-deck-final-overview.png", 5, "الآن تم توليد العرض الكامل. هذه نسخة حقيقية قابلة للتعديل وليست مجرد نص."),
            Segment("assets/screenshots/gamma/08-english-slide-closeup-title.png", 4, "نفتح شريحة العنوان ونراجع وضوح العنوان والتنسيق."),
            Segment("assets/screenshots/gamma/09-english-slide-closeup-action-plan.png", 4, "نراجع أيضا شريحة خطة العمل، لأنها الشريحة التي سيتبعها المستخدم فعلا."),
            Segment("assets/screenshots/gamma/11-english-export-menu.png", 4, "في النهاية نذهب إلى التصدير لنحفظ العرض كملف PDF أو PowerPoint أو صور."),
        ],
        "image-poster-tutorial": [
            Segment(str(image_card.relative_to(ROOT)), 4, "هذا الدرس يريك كيف تصنع بوستر بيع واحد باستخدام image-2 وطريقة كتابة طلب واضح."),
            Segment("assets/screenshots/chatgpt-core-batch-02-spreadsheets-images.png", 5, "نبدأ بكتابة الطلب كاملا: المنتج، النص المطلوب داخل الصورة، الألوان، المقاس، وأسلوب التصميم."),
            Segment("assets/outputs/oud-weekend-sale-poster-real.png", 6, "هذه النتيجة النهائية. بعد التوليد نفحص العنوان، الخصم، التاريخ، وزر الشراء كما سيظهر للعميل على الجوال."),
            Segment("assets/outputs/oud-weekend-sale-poster-real.png", 5, "إذا كانت الصورة جيدة لكن الكلمات داخلها غير دقيقة، نطلب من الأداة إصلاح النص والتخطيط فقط دون تغيير المشهد كله."),
        ],
        "video-storyboard-tutorial": [
            Segment(str(video_card.relative_to(ROOT)), 4, "هذا الدرس يشرح الطريقة الأسهل للمبتدئ: نص إلى صور، ثم شبكة من تسع لقطات، ثم فيديو قصير."),
            Segment("assets/screenshots/chatgpt-core-batch-03-edit-video.png", 5, "أولا نكتب مشاهد القصة بوضوح: ماذا يظهر في كل لقطة، وما ترتيب المشاهد."),
            Segment("assets/screenshots/chatgpt-core-batch-03-edit-video.png", 5, "بعد ذلك ننشئ صور المشاهد التسعة ونحافظ على نفس المنتج ونفس الأسلوب بين كل لقطة وأخرى."),
            Segment("assets/outputs/ramadan-date-gift-video.mp4", 8, "وأخيرا نجمع الصور في محرر فيديو، نضيف انتقالات خفيفة وموسيقى، ثم نخرج الفيديو النهائي كملف MP4."),
        ],
        "official-api-purchase-tutorial": [
            Segment(str(api_card_1.relative_to(ROOT)), 5, "هذا فيديو إرشادي لشراء API من المصدر الرسمي. نبدأ باختيار المزود المناسب ونراجع صفحة الأسعار."),
            Segment(str(api_card_2.relative_to(ROOT)), 5, "بعد ذلك ننشئ الحساب الرسمي ونضيف وسيلة الدفع فقط بعد فهم الحدود الشهرية والميزانية التجريبية."),
            Segment(str(api_card_3.relative_to(ROOT)), 5, "الخطوة التالية هي إنشاء مفتاح API تجريبي وحفظه في الخادم فقط، وليس داخل صفحة عامة."),
            Segment(str(api_card_4.relative_to(ROOT)), 5, "ثم نربط المفتاح بمسار اختبار واحد، ونفحص التكلفة والسجل والنتيجة قبل الإطلاق."),
        ],
        "arabai-wallet-simulation": [
            Segment(str(wallet_card_1.relative_to(ROOT)), 5, "هذا شرح تمثيلي لمسار رصيد ARABAI قبل فتح الشحن الحقيقي للعامة."),
            Segment(str(wallet_card_2.relative_to(ROOT)), 5, "المستخدم يختار باقة رصيد صغيرة، ويفهم التكلفة حسب المهمة لا حسب كلمات تقنية معقدة."),
            Segment(str(wallet_card_3.relative_to(ROOT)), 5, "بعدها يختار المهمة من مكان واحد، وARABAI يرسل الطلب في الخلفية ويعرض النتيجة مع خصم الرصيد."),
            Segment(str(wallet_card_4.relative_to(ROOT)), 5, "ويجب أن تبقى صفحة الرصيد واضحة: ماذا استهلك المستخدم، وما الباقي، وما الذي ما زال تجريبيا."),
        ],
    }


def build_video(name: str, segments: list[Segment]) -> None:
    clip_paths: list[Path] = []
    for idx, segment in enumerate(segments, start=1):
        clip_path = CLIP_DIR / f"{name}-{idx:02d}.mp4"
        src = ROOT / segment.source
        if segment.source_type == "video" or src.suffix.lower() == ".mp4":
            make_video_clip(src, clip_path, segment.seconds)
        else:
            make_image_clip(src, clip_path, segment.seconds)
        clip_paths.append(clip_path)

    concat_video(f"{name}.mp4", clip_paths)
    write_vtt(f"{name}.ar.vtt", segments)


def main() -> None:
    ensure_dirs()
    tutorials = build_segments()
    for name, segments in tutorials.items():
        build_video(name, segments)
    print("Built tutorial videos in", OUT_DIR)


if __name__ == "__main__":
    main()

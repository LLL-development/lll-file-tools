export const translations = {
  en: {
    brand: "File Toolkit",
    heroTitle: "Everyday file tools, right in your browser",
    heroDesc: "Extract and create ZIPs, batch-rename files, generate checksums, and inspect metadata. Nothing is uploaded — every operation runs locally on your device.",
    heroBadge: "100% private · no uploads",
    toggleTheme: "Toggle theme",
    chooseLanguage: "Language",
    back: "All tools",

    tool_zipExtract_title: "ZIP Extractor",
    tool_zipExtract_desc: "Open a .zip archive and download the files inside it.",
    tool_zipCreate_title: "ZIP Creator",
    tool_zipCreate_desc: "Bundle multiple files into a single downloadable .zip.",
    tool_rename_title: "Rename Multiple Files",
    tool_rename_desc: "Batch rename files with prefixes, find & replace, or numbering.",
    tool_hash_title: "File Hash & Checksum",
    tool_hash_desc: "Compute MD5, SHA-1, SHA-256 and SHA-512 for any file.",
    tool_metadata_title: "File Metadata Viewer",
    tool_metadata_desc: "Inspect size, type, dates and dimensions of your files.",

    dropzoneZip: "Drag & drop a .zip file here, or click to browse",
    dropzoneFiles: "Drag & drop files here, or click to browse",
    dropzoneFilesMulti: "Drag & drop any number of files here, or click to browse",

    zipExtract_loading: "Reading archive…",
    zipExtract_entries: "files found",
    zipExtract_extractAll: "Download all as .zip",
    zipExtract_selected: "Download selected",
    zipExtract_selectAll: "Select all",
    zipExtract_empty: "No archive loaded yet.",
    zipExtract_folder: "folder",

    zipCreate_name: "Archive name",
    zipCreate_create: "Create & download .zip",
    zipCreate_clear: "Clear all",
    zipCreate_empty: "No files added yet.",
    zipCreate_count: "files added",

    rename_findReplace: "Find & replace",
    rename_find: "Find",
    rename_replace: "Replace with",
    rename_prefix: "Prefix",
    rename_suffix: "Suffix",
    rename_case: "Change case",
    rename_caseNone: "No change",
    rename_caseLower: "lowercase",
    rename_caseUpper: "UPPERCASE",
    rename_caseTitle: "Title Case",
    rename_numbering: "Sequential numbering",
    rename_numberingOn: "Add numbering",
    rename_startAt: "Start at",
    rename_padding: "Digits (padding)",
    rename_pattern: "Pattern ({n} = number, {name} = original name, {ext} = extension)",
    rename_download: "Download renamed files (.zip)",
    rename_clear: "Clear all",
    rename_empty: "No files added yet.",
    rename_conflict: "Duplicate name — please adjust rules",
    rename_original: "Original",
    rename_new: "New name",

    hash_algorithms: "Algorithms",
    hash_compare: "Compare with expected checksum (optional)",
    hash_comparePlaceholder: "Paste a checksum to verify…",
    hash_match: "Match",
    hash_noMatch: "No match",
    hash_empty: "No files added yet.",
    hash_computing: "Computing…",
    hash_copy: "Copy",
    hash_copied: "Copied!",
    hash_clear: "Clear all",

    meta_empty: "No files added yet.",
    meta_clear: "Clear all",
    meta_name: "Name",
    meta_type: "Type",
    meta_size: "Size",
    meta_modified: "Last modified",
    meta_dimensions: "Dimensions",
    meta_duration: "Duration",
    meta_unknown: "Unknown",

    common_remove: "Remove",
    common_download: "Download",
    common_bytes: "bytes",
    common_files: "files",
  },

  ja: {
    brand: "ファイルツールキット",
    heroTitle: "ブラウザだけで完結する日常ファイルツール",
    heroDesc: "ZIPの解凍・作成、複数ファイルの一括リネーム、チェックサムの生成、メタデータの確認ができます。アップロードは一切行わず、すべての処理はお使いの端末内で完結します。",
    heroBadge: "完全プライベート・アップロードなし",
    toggleTheme: "テーマ切替",
    chooseLanguage: "言語",
    back: "ツール一覧",

    tool_zipExtract_title: "ZIP解凍",
    tool_zipExtract_desc: ".zipアーカイブを開いて中のファイルをダウンロードします。",
    tool_zipCreate_title: "ZIP作成",
    tool_zipCreate_desc: "複数のファイルを1つの.zipにまとめてダウンロードします。",
    tool_rename_title: "複数ファイルの一括リネーム",
    tool_rename_desc: "接頭辞・接尾辞、検索置換、連番でファイル名を一括変更します。",
    tool_hash_title: "ファイルハッシュ・チェックサム",
    tool_hash_desc: "MD5、SHA-1、SHA-256、SHA-512を計算します。",
    tool_metadata_title: "ファイルメタデータビューア",
    tool_metadata_desc: "サイズ、種類、日付、寸法などの情報を確認します。",

    dropzoneZip: ".zipファイルをドラッグ＆ドロップ、またはクリックして選択",
    dropzoneFiles: "ファイルをドラッグ＆ドロップ、またはクリックして選択",
    dropzoneFilesMulti: "任意の数のファイルをドラッグ＆ドロップ、またはクリックして選択",

    zipExtract_loading: "アーカイブを読み込み中…",
    zipExtract_entries: "件のファイルが見つかりました",
    zipExtract_extractAll: "すべてを.zipでダウンロード",
    zipExtract_selected: "選択したものをダウンロード",
    zipExtract_selectAll: "すべて選択",
    zipExtract_empty: "アーカイブが読み込まれていません。",
    zipExtract_folder: "フォルダ",

    zipCreate_name: "アーカイブ名",
    zipCreate_create: "作成してダウンロード",
    zipCreate_clear: "すべてクリア",
    zipCreate_empty: "ファイルが追加されていません。",
    zipCreate_count: "件のファイルを追加済み",

    rename_findReplace: "検索と置換",
    rename_find: "検索する文字列",
    rename_replace: "置換後の文字列",
    rename_prefix: "接頭辞",
    rename_suffix: "接尾辞",
    rename_case: "大文字・小文字",
    rename_caseNone: "変更しない",
    rename_caseLower: "小文字",
    rename_caseUpper: "大文字",
    rename_caseTitle: "先頭を大文字に",
    rename_numbering: "連番",
    rename_numberingOn: "連番を追加",
    rename_startAt: "開始番号",
    rename_padding: "桁数（ゼロ埋め）",
    rename_pattern: "パターン（{n}=番号、{name}=元の名前、{ext}=拡張子）",
    rename_download: "リネーム後のファイルをダウンロード（.zip）",
    rename_clear: "すべてクリア",
    rename_empty: "ファイルが追加されていません。",
    rename_conflict: "名前が重複しています。ルールを調整してください",
    rename_original: "元のファイル名",
    rename_new: "新しいファイル名",

    hash_algorithms: "アルゴリズム",
    hash_compare: "チェックサムと比較（任意）",
    hash_comparePlaceholder: "チェックサムを貼り付けて照合…",
    hash_match: "一致",
    hash_noMatch: "不一致",
    hash_empty: "ファイルが追加されていません。",
    hash_computing: "計算中…",
    hash_copy: "コピー",
    hash_copied: "コピーしました！",
    hash_clear: "すべてクリア",

    meta_empty: "ファイルが追加されていません。",
    meta_clear: "すべてクリア",
    meta_name: "名前",
    meta_type: "種類",
    meta_size: "サイズ",
    meta_modified: "更新日時",
    meta_dimensions: "寸法",
    meta_duration: "再生時間",
    meta_unknown: "不明",

    common_remove: "削除",
    common_download: "ダウンロード",
    common_bytes: "バイト",
    common_files: "件のファイル",
  },

  zh: {
    brand: "文件工具箱",
    heroTitle: "日常文件处理工具，浏览器本地运行",
    heroDesc: "解压和创建 ZIP、批量重命名文件、生成校验和、查看文件元数据。所有操作均在本地完成，文件不会上传到任何服务器。",
    heroBadge: "100% 本地处理 · 无需上传",
    toggleTheme: "切换主题",
    chooseLanguage: "语言",
    back: "所有工具",

    tool_zipExtract_title: "ZIP 解压",
    tool_zipExtract_desc: "打开 .zip 压缩包并下载其中的文件。",
    tool_zipCreate_title: "ZIP 创建",
    tool_zipCreate_desc: "将多个文件打包成一个可下载的 .zip。",
    tool_rename_title: "批量重命名文件",
    tool_rename_desc: "通过前缀、后缀、查找替换或序号批量重命名文件。",
    tool_hash_title: "文件哈希与校验和",
    tool_hash_desc: "计算 MD5、SHA-1、SHA-256 和 SHA-512。",
    tool_metadata_title: "文件元数据查看器",
    tool_metadata_desc: "查看文件的大小、类型、日期和尺寸等信息。",

    dropzoneZip: "将 .zip 文件拖放到此处，或点击选择",
    dropzoneFiles: "将文件拖放到此处，或点击选择",
    dropzoneFilesMulti: "拖放任意数量的文件到此处，或点击选择",

    zipExtract_loading: "正在读取压缩包…",
    zipExtract_entries: "个文件",
    zipExtract_extractAll: "全部下载为 .zip",
    zipExtract_selected: "下载所选文件",
    zipExtract_selectAll: "全选",
    zipExtract_empty: "尚未加载压缩包。",
    zipExtract_folder: "文件夹",

    zipCreate_name: "压缩包名称",
    zipCreate_create: "创建并下载",
    zipCreate_clear: "清空全部",
    zipCreate_empty: "尚未添加任何文件。",
    zipCreate_count: "个文件已添加",

    rename_findReplace: "查找与替换",
    rename_find: "查找内容",
    rename_replace: "替换为",
    rename_prefix: "前缀",
    rename_suffix: "后缀",
    rename_case: "大小写",
    rename_caseNone: "不更改",
    rename_caseLower: "小写",
    rename_caseUpper: "大写",
    rename_caseTitle: "首字母大写",
    rename_numbering: "序号",
    rename_numberingOn: "添加序号",
    rename_startAt: "起始编号",
    rename_padding: "位数（补零）",
    rename_pattern: "命名模式（{n}=编号，{name}=原文件名，{ext}=扩展名）",
    rename_download: "下载重命名后的文件（.zip）",
    rename_clear: "清空全部",
    rename_empty: "尚未添加任何文件。",
    rename_conflict: "文件名重复，请调整规则",
    rename_original: "原文件名",
    rename_new: "新文件名",

    hash_algorithms: "算法",
    hash_compare: "与预期校验和比较（可选）",
    hash_comparePlaceholder: "粘贴校验和以进行核对…",
    hash_match: "匹配",
    hash_noMatch: "不匹配",
    hash_empty: "尚未添加任何文件。",
    hash_computing: "计算中…",
    hash_copy: "复制",
    hash_copied: "已复制！",
    hash_clear: "清空全部",

    meta_empty: "尚未添加任何文件。",
    meta_clear: "清空全部",
    meta_name: "名称",
    meta_type: "类型",
    meta_size: "大小",
    meta_modified: "修改时间",
    meta_dimensions: "尺寸",
    meta_duration: "时长",
    meta_unknown: "未知",

    common_remove: "移除",
    common_download: "下载",
    common_bytes: "字节",
    common_files: "个文件",
  },
};

const LANG_KEY = "fileToolkit.lang";
let currentLang = localStorage.getItem(LANG_KEY) || detectDefaultLang();

function detectDefaultLang() {
  const nav = (navigator.language || "en").toLowerCase();
  if (nav.startsWith("ja")) return "ja";
  if (nav.startsWith("zh")) return "zh";
  return "en";
}

export function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || translations.en[key] || key;
}

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  applyTranslations();
  document.documentElement.lang = lang;
  window.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}

export function applyTranslations(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(key));
  });
  root.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria-label");
    el.setAttribute("aria-label", t(key));
  });
}

document.documentElement.lang = currentLang;

$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outDir = "d:\web portofolio\scratch\langkah-c"
$userData = "$outDir\chrome-user-data"

if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}
if (!(Test-Path $userData)) {
    New-Item -ItemType Directory -Force -Path $userData | Out-Null
}

$scenarios = @(
    @{ name = "skenario-1-desktop-top.png"; query = "?test_scenario=1"; size = "1440,900" },
    @{ name = "skenario-2-desktop-scrolled.png"; query = "?test_scenario=2"; size = "1440,900" },
    @{ name = "skenario-3-desktop-back-top.png"; query = "?test_scenario=3"; size = "1440,900" },
    @{ name = "skenario-4-siklus-1-down.png"; query = "?test_scenario=4_down_1"; size = "1440,900" },
    @{ name = "skenario-4-siklus-1-up.png"; query = "?test_scenario=4_up_1"; size = "1440,900" },
    @{ name = "skenario-4-siklus-2-down.png"; query = "?test_scenario=4_down_2"; size = "1440,900" },
    @{ name = "skenario-4-siklus-2-up.png"; query = "?test_scenario=4_up_2"; size = "1440,900" },
    @{ name = "skenario-4-siklus-3-down.png"; query = "?test_scenario=4_down_3"; size = "1440,900" },
    @{ name = "skenario-4-siklus-3-up.png"; query = "?test_scenario=4_up_3"; size = "1440,900" },
    @{ name = "skenario-5-hash-proyek.png"; query = "#proyek"; size = "1440,900" },
    @{ name = "skenario-5-hash-back-to-top.png"; query = "?test_scenario=5_top"; size = "1440,900" },
    @{ name = "skenario-6-aos-tentang.png"; query = "?test_scenario=6_tentang"; size = "1440,900" },
    @{ name = "skenario-7-mobile-top.png"; query = "?test_scenario=1"; size = "375,812" },
    @{ name = "skenario-7-mobile-scrolled.png"; query = "?test_scenario=7_down"; size = "375,812" },
    @{ name = "skenario-7-mobile-back-top.png"; query = "?test_scenario=7_up"; size = "375,812" },
    @{ name = "skenario-8-light-theme.png"; query = "?test_scenario=8_light"; size = "1440,900" },
    @{ name = "skenario-8-dark-theme.png"; query = "?test_scenario=8_dark"; size = "1440,900" }
)

Write-Host "=== MEMULAI PENGUJIAN BROWSER SUNGGUHAN (CHROME HEADLESS) ===" -ForegroundColor Cyan

$passed = 0
$failed = 0

foreach ($sc in $scenarios) {
    $outFile = "$outDir\$($sc.name)"
    if (Test-Path $outFile) { Remove-Item $outFile -Force }

    $url = "file:///d:/web portofolio/index.html$($sc.query)"
    $args = @(
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--virtual-time-budget=2000",
        "--window-size=$($sc.size)",
        "--user-data-dir=`"$userData`"",
        "--screenshot=`"$outFile`"",
        "`"$url`""
    )

    $proc = Start-Process -FilePath $chrome -ArgumentList $args -PassThru -Wait

    if ((Test-Path $outFile) -and ((Get-Item $outFile).Length -gt 1000)) {
        $len = (Get-Item $outFile).Length
        Write-Host "[LULUS] $($sc.name) ($len bytes, viewport: $($sc.size))" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "[GAGAL] $($sc.name)" -ForegroundColor Red
        $failed++
    }
}

Write-Host "`n=== REKAP AKHIR PENGUJIAN BROWSER SUNGGUHAN (C-5) ===" -ForegroundColor Cyan
Write-Host "Total Skenario: $($scenarios.Count) | Lolos: $passed | Gagal: $failed"
if ($failed -gt 0) { exit 1 } else { exit 0 }

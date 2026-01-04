
Add-Type -AssemblyName System.Drawing

function Convert-ToPng {
    param ($path)
    $fullPath = Resolve-Path $path
    $tempPath = "$fullPath.temp.png"
    Write-Host "Converting $fullPath to PNG..."
    
    try {
        $img = [System.Drawing.Image]::FromFile($fullPath)
        $img.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $img.Dispose()
        
        Remove-Item $fullPath -Force
        Move-Item $tempPath $fullPath -Force
        Write-Host "Success: $path"
    } catch {
        Write-Error "Failed to convert $path : $_"
    }
}

Convert-ToPng "public\pwa-192x192.png"
Convert-ToPng "public\pwa-512x512.png"

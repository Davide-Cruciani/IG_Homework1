// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos )
{
    const BW = bgImg.width;
    const BH = bgImg.height;
    const FW = fgImg.width;
    const FH = fgImg.height;
    const xOffset = fgPos.x;
    const yOffset = fgPos.y;
    const startH = Math.max(0, yOffset);
    const startW = Math.max(0, xOffset);
    const endH = Math.min(BW, yOffset+FH);
    const endW = Math.min(BW, xOffset+FW);
    
    console.log("Background: ", BW, BH, bgImg.data);
    console.log("Foreground: ", FW, FH, fgImg.data);
    console.log("W: ", startW, endW, endW-startW, "H: ", startH, endH, endH-startH);
    console.log(fgPos);
    console.log(fgOpac);

    for (let w = 0;w<FW;w++){
        for(let h=0;h<FH;h++){
            let wPossInB = w+xOffset;
            let hPossInB = h+yOffset;
            const alphaf = fgImg.data[3 + w*4 + h*4*FW]*fgOpac/255;
            const alphab = bgImg.data[3 + w*4 + h*4*BW]/255;
            const alphac = alphaf + (1-alphaf)*alphab;
            if(wPossInB<0 || wPossInB>=BW || hPossInB<0 || hPossInB>=BH) continue;
            for(let ch=0;ch<3;ch++){
                const valueFg = fgImg.data[ch + w*4 + h*4*FW];          
                const valueBg = bgImg.data[ch + wPossInB*4 + hPossInB*4*BW];
                bgImg.data[ch + wPossInB*4 + hPossInB*4*BW] = (valueFg*alphaf + valueBg*(1-(alphaf))*alphab)/alphac;
            }
            bgImg.data[3 + wPossInB*4 + hPossInB*4*BW] = alphac * 255;
        }
    }
}

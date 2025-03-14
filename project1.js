// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos )
{
    bW = bgImg.width;
    bH = bgImg.height;
    fW = fgImg.width;
    fH = fgImg.height;


    a = new Array();
    startH = Math.max(0, fgPos.y);
    startW = Math.max(0, fgPos.x);
    endH = Math.min(bW, fgPos.y+fH);
    endW = Math.min(bW, fgPos.x+fW);
    
    console.log("Background: ", bW, bH, bgImg.data.length);
    console.log("Foreground: ", fW, fH, fgImg.data.length);
    console.log(startW, endW, startH, endH);
    console.log(fgPos);
    

    for (let w=startW;w<endW;w++){
        for(let h=startH;h<endH;h++){
            for(let ch=0;ch<4;ch++){
                if((ch + h*4 + w*4*bH) in a) {
                }
                else {
                    a.push((ch + h*4 + w*4*bH))
                };
                bgImg.data[ch + w*4 + h*4*bW] = 255
            }
        }
    }
    console.log(a[a.length-1])
}

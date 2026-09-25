const raw=['.cr2','.cr3','.crw','.nef','.nrw','.arw','.srf','.sr2','.raf','.orf','.rw2','.raw','.dng','.pef','.ptx','.srw','.rwl','.3fr','.fff','.iiq','.kdc','.dcr','.mos','.mrw','.erf','.mef'];
module.exports={raw,all:['.jpg','.jpeg','.png','.webp',...raw],isRaw:ext=>raw.includes(ext.toLowerCase())};

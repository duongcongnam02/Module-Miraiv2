const configCommand = {
    name: 'tx',
    version: '10.02',
    hasPermssion: 2,
    credits: 'DC-Nam',
    description: 'Cược tài xỉu trên Messenger',
    commandCategory: 'Game',
    usages: '[tx]',
    cooldowns: 3
};
async function runCommand(arg) {
    const gửi = (a, b, c, d) => arg.api.sendMessage(a, b?b: arg.event.threadID, c?c: null, d?d: arg.event.messageID),
    j = ['tài',
        'tai',
        't'].includes(arg.args[0])?'tài':
        ['xỉu',
        'xiu',
        'x'].includes(arg.args[0])?'xỉu': false,
    lần_lắc = arg.args[3] || 10;
    try {
        if (!j || ((ifx0 = arg.args[1]), ifx0 < 4 || ifx0 > 17 || isNaN(ifx0)) || (isNaN(arg.args[2]) && arg.args[2] != 'all')) return gửi(`Vui lòng đặt cược đúng định dạng: [tài || xỉu] [điểm] [tiền cược || all] [lần lắc || bỏ trống]`);
        if ((m = (await arg.Currencies.getData(arg.event.senderID)).money), (ifx1=arg.args[2] == 'all'), ifx1 ? m == 0: isFinite(arg.args[2])?(arg.args[2] > m || arg.args[2] < 1):true) return gửi(ifx1 && m == 0?'Có tiền đéo đâu mà cược all':`Số tiền cược phải lớn hơn 0 và nhỏ hơn ${m+1}!`);
        gửi(`Số lần lắc ${lần_lắc}...`, '', (e, d) => {
            const lắc = Lắc(3, lần_lắc),
            typ = (((b = lắc.tổng), ($x0 = /3|18/.test(b))), $x0?'': (` (${$x1 = b < 11?'xỉu': 'tài'})`)),
            rlt = $x0 || j != $x1?false: true,
            mbs = ((ratio = arg.args[1] == b ? 2: 1), (arg.args[2] == 'all'?m: arg.args[2])*ratio),
            txt = a => `[====[ TÀI XỈU ]====]\n\n- Kết quả: [ ${a[0]} | ${a[1]} | ${a[2]} ]\n- Tổng Điểm: ${b}${typ}\n- Bạn ${rlt?'Thắng': 'Thua'} ${mbs}$ (1.${ratio})\n\n-> Tổng Tài Sản: ${rlt?m+mbs: m-mbs}$`;
            setTimeout(()=>arg.api.unsendMessage(d.messageID, ()=>gửi(txt(lắc.kết_quả), '', ()=>arg.Currencies[rlt?'increaseMoney': 'decreaseMoney'](arg.event.senderID, +mbs))), 1000);
        });
    }catch(lỗi) {
        gửi(lỗi)
    }
};
function Lắc(a/* số xí ngầu 🎲 bỏ vào */, b/* giới hạn số lần lắc */) {
    var kết_quả = [],
    xí_ngầu = ()=>Math.floor(Math.random()*6)+1,
    lần_lắc = 0;
    while (kết_quả.length != (a < 1?1: a)) ++lần_lắc >= b?kết_quả.push(xí_ngầu()): '';
    return {
        kết_quả,
        tổng: kết_quả.reduce((acl, ele)=>acl+ele)};
};

module.exports = {
    config: configCommand,
    run: runCommand
};

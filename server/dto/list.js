function _0x2a81() {
  const _0xf15884 = [
    "rows",
    "1457298LUdblL",
    "35472lRAoXb",
    "assign",
    "map",
    "buttonText",
    "65wAHqpL",
    "now",
    "595558kHTNFD",
    "57271oesjXV",
    "stringify",
    "../lib/helper",
    "3695430NKLKZq",
    "message",
    "toSectionsString",
    "imageMessage",
    "list",
    "ulid",
    "image",
    "77YcbQhn",
    "49008eJpwNg",
    "295272alBJsH",
    "single_select",
    "api",
    "header",
  ];
  _0x2a81 = function () {
    return _0xf15884;
  };
  return _0x2a81();
}
const _0x368d1e = _0x3e86;
(function (_0x1b5fe7, _0x368b3c) {
  const _0x1b006f = _0x3e86,
    _0x41b02e = _0x1b5fe7();
  while (!![]) {
    try {
      const _0x28f2a5 =
        -parseInt(_0x1b006f(0x17e)) / 0x1 +
        parseInt(_0x1b006f(0x17d)) / 0x2 +
        -parseInt(_0x1b006f(0x18a)) / 0x3 +
        (-parseInt(_0x1b006f(0x189)) / 0x4) *
          (parseInt(_0x1b006f(0x17b)) / 0x5) +
        parseInt(_0x1b006f(0x181)) / 0x6 +
        (-parseInt(_0x1b006f(0x188)) / 0x7) *
          (parseInt(_0x1b006f(0x177)) / 0x8) +
        -parseInt(_0x1b006f(0x176)) / 0x9;
      if (_0x28f2a5 === _0x368b3c) break;
      else _0x41b02e["push"](_0x41b02e["shift"]());
    } catch (_0x31ffbf) {
      _0x41b02e["push"](_0x41b02e["shift"]());
    }
  }
})(_0x2a81, 0x5ebb1);
function _0x3e86(_0x3ab558, _0x216912) {
  const _0x2a813c = _0x2a81();
  return (
    (_0x3e86 = function (_0x3e8651, _0x5b8b4a) {
      _0x3e8651 = _0x3e8651 - 0x173;
      let _0x55eb73 = _0x2a813c[_0x3e8651];
      return _0x55eb73;
    }),
    _0x3e86(_0x3ab558, _0x216912)
  );
}
const { ulid } = require(_0x368d1e(0x186)),
  { prepareMediaMessage } = require(_0x368d1e(0x180));
class Row {
  constructor(_0x251fe4) {
    const _0x1c18a0 = _0x368d1e;
    Object["assign"](this, _0x251fe4),
      !this["id"] && (this["id"] = ulid(Date[_0x1c18a0(0x17c)]())),
      !this[_0x1c18a0(0x174)] && (this[_0x1c18a0(0x174)] = "");
  }
}
class ListSection {
  constructor(_0x4388e3) {
    const _0x266671 = _0x368d1e;
    Object[_0x266671(0x178)](this, _0x4388e3),
      (this[_0x266671(0x175)] = _0x4388e3[_0x266671(0x175)]["map"](
        (_0x150dca) => new Row(_0x150dca)
      ));
  }
}
class Section {
  constructor(_0x2bb616) {
    const _0x4f8c23 = _0x368d1e;
    Object[_0x4f8c23(0x178)](this, _0x2bb616),
      (this[_0x4f8c23(0x185)] = _0x2bb616[_0x4f8c23(0x185)][_0x4f8c23(0x179)](
        (_0x2dede5) => new ListSection(_0x2dede5)
      ));
  }
  [_0x368d1e(0x183)]() {
    const _0x2f6d06 = _0x368d1e;
    return JSON["stringify"]({
      title: this[_0x2f6d06(0x17a)],
      sections: this[_0x2f6d06(0x185)],
    });
  }
}
const formatListMsg = async (
  _0x1e894c,
  _0x8d9af9,
  _0x2de3be,
  _0x300abf,
  _0x5b3a14
) => {
  const _0x56b1e7 = _0x368d1e,
    _0x137131 = await (async () => {
      const _0x4ef861 = _0x3e86;
      if (_0x5b3a14)
        return await prepareMediaMessage(_0x300abf, {
          mediatype: _0x4ef861(0x187),
          media: _0x5b3a14,
        });
    })();
  return {
    interactiveMessage: {
      carouselMessage: {
        cards: [
          {
            body: {
              text: (function () {
                return _0x2de3be;
              })(),
            },
            footer: { text: _0x8d9af9 ?? ".." },
            header: (function () {
              const _0x4bc011 = _0x3e86;
              if (_0x137131?.[_0x4bc011(0x182)]?.["imageMessage"])
                return {
                  hasMediaAttachment:
                    !!_0x137131[_0x4bc011(0x182)][_0x4bc011(0x184)],
                  imageMessage: _0x137131[_0x4bc011(0x182)]["imageMessage"],
                };
            })(),
            nativeFlowMessage: {
              buttons: _0x1e894c["map"](function (_0x5b510a) {
                const _0x548daa = _0x3e86;
                return {
                  name: _0x548daa(0x18b),
                  buttonParamsJson: _0x5b510a["toSectionsString"](),
                };
              }),
              messageParamsJson: JSON[_0x56b1e7(0x17f)]({
                from: _0x56b1e7(0x173),
                templateId: ulid(Date[_0x56b1e7(0x17c)]()),
              }),
            },
            messageVersion: 0x1,
          },
        ],
      },
    },
  };
};
module["exports"] = { formatListMsg: formatListMsg, Section: Section };

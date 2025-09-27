const _0x165aa4 = _0x26d2;
function _0x26d2(_0x4c4fba, _0x48218a) {
  const _0x4632aa = _0x4632();
  return (
    (_0x26d2 = function (_0x26d20a, _0x4e6b52) {
      _0x26d20a = _0x26d20a - 0x1a5;
      let _0x5a9f95 = _0x4632aa[_0x26d20a];
      return _0x5a9f95;
    }),
    _0x26d2(_0x4c4fba, _0x48218a)
  );
}
function _0x4632() {
  const _0x2a278f = [
    "8290800KRncLJ",
    "now",
    "ulid",
    "toJSONString",
    "3Zdrfhx",
    "imageMessage",
    "phoneNumber",
    "423087XKMsdw",
    "get",
    "url",
    "displayText",
    "mapType",
    "quick_reply",
    "type",
    "59173270zhTOym",
    "exports",
    "../lib/helper",
    "6zoRSWU",
    "186nwjloI",
    "1366911SgOPsK",
    "338564ZIiWMM",
    "map",
    "cta_copy",
    "copyCode",
    "api",
    "message",
    "copy",
    "11474016cBKrNh",
    "call",
    "cta_url",
    "195368vHHQcr",
    "cta_call",
    "reply",
    "typeButton",
  ];
  _0x4632 = function () {
    return _0x2a278f;
  };
  return _0x4632();
}
(function (_0x4cc5cc, _0x412c23) {
  const _0x4d1c20 = _0x26d2,
    _0x476be8 = _0x4cc5cc();
  while (!![]) {
    try {
      const _0x31da2f =
        (-parseInt(_0x4d1c20(0x1bc)) / 0x1) *
          (parseInt(_0x4d1c20(0x1b4)) / 0x2) +
        (parseInt(_0x4d1c20(0x1a7)) / 0x3) *
          (parseInt(_0x4d1c20(0x1aa)) / 0x4) +
        -parseInt(_0x4d1c20(0x1b8)) / 0x5 +
        (parseInt(_0x4d1c20(0x1a8)) / 0x6) *
          (-parseInt(_0x4d1c20(0x1bf)) / 0x7) +
        -parseInt(_0x4d1c20(0x1b1)) / 0x8 +
        parseInt(_0x4d1c20(0x1a9)) / 0x9 +
        parseInt(_0x4d1c20(0x1c6)) / 0xa;
      if (_0x31da2f === _0x412c23) break;
      else _0x476be8["push"](_0x476be8["shift"]());
    } catch (_0x2bc69a) {
      _0x476be8["push"](_0x476be8["shift"]());
    }
  }
})(_0x4632, 0xef199);
const { ulid } = require(_0x165aa4(0x1ba)),
  { prepareMediaMessage } = require(_0x165aa4(0x1a6));
class Button {
  constructor(_0x44db77) {
    const _0x598b6b = _0x165aa4;
    (this[_0x598b6b(0x1c5)] = _0x44db77["type"] || "reply"),
      (this[_0x598b6b(0x1c2)] = _0x44db77[_0x598b6b(0x1c2)] || ""),
      (this["id"] = _0x44db77["id"]),
      (this["url"] = _0x44db77[_0x598b6b(0x1c1)]),
      (this[_0x598b6b(0x1ad)] = _0x44db77[_0x598b6b(0x1ad)]),
      (this[_0x598b6b(0x1be)] = _0x44db77[_0x598b6b(0x1be)]),
      this[_0x598b6b(0x1c5)] === "reply" &&
        !this["id"] &&
        (this["id"] = ulid()),
      (this[_0x598b6b(0x1c3)] = new Map([
        [_0x598b6b(0x1b6), _0x598b6b(0x1c4)],
        [_0x598b6b(0x1b0), _0x598b6b(0x1ac)],
        [_0x598b6b(0x1c1), _0x598b6b(0x1b3)],
        [_0x598b6b(0x1b2), _0x598b6b(0x1b5)],
      ]));
  }
  get [_0x165aa4(0x1b7)]() {
    const _0x4a67fb = _0x165aa4;
    return this[_0x4a67fb(0x1c3)][_0x4a67fb(0x1c0)](this[_0x4a67fb(0x1c5)]);
  }
  [_0x165aa4(0x1bb)]() {
    const _0x19494a = _0x165aa4,
      _0x21ece4 = (_0x242269) => JSON["stringify"](_0x242269),
      _0x57c634 = {
        call: () =>
          _0x21ece4({
            display_text: this[_0x19494a(0x1c2)],
            phone_number: this["phoneNumber"],
          }),
        reply: () =>
          _0x21ece4({ display_text: this[_0x19494a(0x1c2)], id: this["id"] }),
        copy: () =>
          _0x21ece4({
            display_text: this[_0x19494a(0x1c2)],
            copy_code: this[_0x19494a(0x1ad)],
          }),
        url: () =>
          _0x21ece4({
            display_text: this["displayText"],
            url: this[_0x19494a(0x1c1)],
            merchant_url: this[_0x19494a(0x1c1)],
          }),
      };
    return _0x57c634[this["type"]]?.() || "";
  }
}
const formatButtonMsg = async (
  _0x588765,
  _0x5774d6,
  _0x552715,
  _0x4bb6b3,
  _0x13731f = null
) => {
  const _0x1c279f = _0x165aa4,
    _0x3f2924 = await (async () => {
      if (_0x13731f)
        return await prepareMediaMessage(_0x4bb6b3, {
          mediatype: "image",
          media: _0x13731f,
        });
    })();
  return {
    interactiveMessage: {
      carouselMessage: {
        cards: [
          {
            body: {
              text: (() => {
                return _0x552715;
              })(),
            },
            footer: { text: _0x5774d6 ?? ".." },
            header: (() => {
              const _0x22fffa = _0x26d2;
              if (_0x3f2924?.[_0x22fffa(0x1af)]?.[_0x22fffa(0x1bd)])
                return {
                  hasMediaAttachment:
                    !!_0x3f2924[_0x22fffa(0x1af)][_0x22fffa(0x1bd)],
                  imageMessage: _0x3f2924[_0x22fffa(0x1af)][_0x22fffa(0x1bd)],
                };
            })(),
            nativeFlowMessage: {
              buttons: _0x588765[_0x1c279f(0x1ab)]((_0x8c8900) => {
                const _0x5c270f = _0x1c279f;
                return {
                  name: _0x8c8900[_0x5c270f(0x1b7)],
                  buttonParamsJson: _0x8c8900[_0x5c270f(0x1bb)](),
                };
              }),
              messageParamsJson: JSON["stringify"]({
                from: _0x1c279f(0x1ae),
                templateId: ulid(Date[_0x1c279f(0x1b9)]()),
              }),
            },
          },
        ],
        messageVersion: 0x1,
      },
    },
  };
};
module[_0x165aa4(0x1a5)] = { Button: Button, formatButtonMsg: formatButtonMsg };



// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module !== 'undefined' ? Module : {};



// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
(function (root) {
  "use strict";

  function wrapLibrary(Module) {
    Module["crypto_auth_hmacsha256_BYTES"] = Module.cwrap(
      "opaquejs_crypto_auth_hmacsha256_BYTES",
      "number"
    )();
    Module["crypto_core_ristretto255_BYTES"] = Module.cwrap(
      "opaquejs_crypto_core_ristretto255_BYTES",
      "number"
    )();
    Module["crypto_hash_sha256_BYTES"] = Module.cwrap(
      "opaquejs_crypto_hash_sha256_BYTES",
      "number"
    )();
    Module["crypto_scalarmult_BYTES"] = Module.cwrap(
      "opaquejs_crypto_scalarmult_BYTES",
      "number"
    )();
    Module["crypto_scalarmult_SCALARBYTES"] = Module.cwrap(
      "opaquejs_crypto_scalarmult_SCALARBYTES",
      "number"
    )();
    Module["crypto_secretbox_KEYBYTES"] = Module.cwrap(
      "opaquejs_crypto_secretbox_KEYBYTES",
      "number"
    )();
    Module["OPAQUE_USER_RECORD_LEN"] = Module.cwrap(
      "opaquejs_OPAQUE_USER_RECORD_LEN",
      "number"
    )();
    Module["OPAQUE_REGISTER_PUBLIC_LEN"] = Module.cwrap(
      "opaquejs_OPAQUE_REGISTER_PUBLIC_LEN",
      "number"
    )();
    Module["OPAQUE_REGISTER_SECRET_LEN"] = Module.cwrap(
      "opaquejs_OPAQUE_REGISTER_SECRET_LEN",
      "number"
    )();
    Module["OPAQUE_SERVER_SESSION_LEN"] = Module.cwrap(
      "opaquejs_OPAQUE_SERVER_SESSION_LEN",
      "number"
    )();
    Module["OPAQUE_REGISTER_USER_SEC_LEN"] = Module.cwrap(
      "opaquejs_OPAQUE_REGISTER_USER_SEC_LEN",
      "number"
    )();
    Module["OPAQUE_USER_SESSION_PUBLIC_LEN"] = Module.cwrap(
      "opaquejs_OPAQUE_USER_SESSION_PUBLIC_LEN",
      "number"
    )();
    Module["OPAQUE_USER_SESSION_SECRET_LEN"] = Module.cwrap(
      "opaquejs_OPAQUE_USER_SESSION_SECRET_LEN",
      "number"
    )();
    Module["OPAQUE_SERVER_AUTH_CTX_LEN"] = Module.cwrap(
      "opaquejs_OPAQUE_SERVER_AUTH_CTX_LEN",
      "number"
    )();

    Module["NotPackaged"] = 0;
    Module["InSecEnv"] = 1;
    Module["InClrEnv"] = 2;

    Module["genServerKeyPair"] = () => {
      return genServerKeyPair(Module);
    };
    Module["GenServerKeyPair"] = Module.cwrap(
      "opaquejs_GenServerKeyPair",
      "number",
      [
        "number", // uint8_t pkS[crypto_scalarmult_BYTES]
        "number", // uint8_t skS[crypto_scalarmult_SCALARBYTES]
      ]
    );
    function genServerKeyPair(module) {
      const pointers = [];
      try {
        const pkS_pointer = new AllocatedBuf(
          module.crypto_scalarmult_BYTES,
          module
        );
        pointers.push(pkS_pointer);
        const skS_pointer = new AllocatedBuf(
          module.crypto_scalarmult_SCALARBYTES,
          module
        );
        pointers.push(skS_pointer);
        if (
          0 !==
          module.GenServerKeyPair(pkS_pointer.address, skS_pointer.address)
        ) {
          const error = new Error("GenServerKeyPair failed.");
          error.name = "OpaqueError";
          throw error;
        }
        return {
          pkS: pkS_pointer.toUint8Array(),
          skS: skS_pointer.toUint8Array(),
        };
      } catch (e) {
        if (e.name === "OpaqueError") throw e;
        const error = new Error(
          "genServerKeyPair failed. (" + e.name + ") " + e.message
        );
        error.name = "OpaqueError";
        error.cause = e;
        throw error;
      } finally {
        zeroAndFree(pointers);
      }
    }

    Module["register"] = (params) => {
      return register(Module, params);
    };
    Module["Register"] = Module.cwrap("opaquejs_Register", "number", [
      "string", // const uint8_t *pwdU,
      "number", // const uint16_t pwdU_len,
      "number", // const uint8_t skS[crypto_scalarmult_SCALARBYTES],
      "number", // const uint8_t cfg_skU,
      "number", // const uint8_t cfg_pkU,
      "number", // const uint8_t cfg_pkS,
      "number", // const uint8_t cfg_idS,
      "number", // const uint8_t cfg_idU,
      "string", // const uint8_t *ids_idU,
      "number", // const uint16_t ids_idU_len,
      "string", // const uint8_t *ids_idS,
      "number", // const uint16_t ids_idS_len,
      "number", // uint8_t rec[OPAQUE_USER_RECORD_LEN/*+envU_len*/],
      "number", // uint8_t export_key[crypto_hash_sha256_BYTES]);
    ]);
    function register(module, params) {
      const pointers = [];
      try {
        const {
          pwdU, // required
          skS, // optional
          cfg, // required
          ids, // required
        } = params;
        validateRequiredStrings({ pwdU });
        validateRequiredStrings(ids);
        validatePkgConfig(cfg);
        const pwdU_len = pwdU.length;

        let skS_pointer;
        if (skS != null) {
          validateUint8Arrays({ skS });
          skS_pointer = AllocatedBuf.fromUint8Array(
            skS,
            module.crypto_scalarmult_SCALARBYTES,
            module
          );
          pointers.push(skS_pointer);
        }

        const envU_len = module.getEnvelopeLen({ cfg, ids });
        const rec_pointer = new AllocatedBuf(
          module.OPAQUE_USER_RECORD_LEN + envU_len,
          module
        );
        pointers.push(rec_pointer);
        const export_key_pointer = new AllocatedBuf(
          module.crypto_hash_sha256_BYTES,
          module
        );
        pointers.push(export_key_pointer);

        if (
          0 !==
          module.Register(
            pwdU,
            pwdU_len,
            skS_pointer ? skS_pointer.address : null,
            cfg.skU,
            cfg.pkU,
            cfg.pkS,
            cfg.idS,
            cfg.idU,
            ids.idU,
            ids.idU.length,
            ids.idS,
            ids.idS.length,
            rec_pointer.address,
            export_key_pointer.address
          )
        ) {
          const error = new Error("Register failed.");
          error.name = "OpaqueError";
          throw error;
        }
        return {
          rec: rec_pointer.toUint8Array(),
          export_key: export_key_pointer.toUint8Array(),
        };
      } catch (e) {
        if (e.name === "OpaqueError") throw e;
        const error = new Error(
          "register failed. (" + e.name + ") " + e.message
        );
        error.name = "OpaqueError";
        error.cause = e;
        throw error;
      } finally {
        zeroAndFree(pointers);
      }
    }

    Module["createCredentialRequest"] = (params) => {
      return createCredentialRequest(Module, params);
    };
    Module["CreateCredentialRequest"] = Module.cwrap(
      "opaquejs_CreateCredentialRequest",
      "number",
      [
        "string", // const uint8_t *pwdU,
        "number", // const uint16_t pwdU_len,
        "number", // uint8_t sec[OPAQUE_USER_SESSION_SECRET_LEN+pwdU_len],
        "number", // uint8_t pub[OPAQUE_USER_SESSION_PUBLIC_LEN]);
      ]
    );
    function createCredentialRequest(module, params) {
      const pointers = [];
      try {
        const { pwdU } = params; // required
        validateRequiredStrings({ pwdU });
        const pwdU_len = pwdU.length;
        const sec_pointer = new AllocatedBuf(
          module.OPAQUE_USER_SESSION_SECRET_LEN + pwdU.length,
          module
        );
        pointers.push(sec_pointer);
        const pub_pointer = new AllocatedBuf(
          module.OPAQUE_USER_SESSION_PUBLIC_LEN,
          module
        );
        pointers.push(pub_pointer);
        if (
          0 !==
          module.CreateCredentialRequest(
            pwdU,
            pwdU_len,
            sec_pointer.address,
            pub_pointer.address
          )
        ) {
          const error = new Error("CreateCredentialRequest failed.");
          error.name = "OpaqueError";
          throw error;
        }
        return {
          sec: sec_pointer.toUint8Array(),
          pub: pub_pointer.toUint8Array(),
        };
      } catch (e) {
        if (e.name === "OpaqueError") throw e;
        const error = new Error(
          "createCredentialRequest failed. (" + e.name + ") " + e.message
        );
        error.name = "OpaqueError";
        error.cause = e;
        throw error;
      } finally {
        zeroAndFree(pointers);
      }
    }

    Module["createCredentialResponse"] = (params) => {
      return createCredentialResponse(Module, params);
    };
    Module["CreateCredentialResponse"] = Module.cwrap(
      "opaquejs_CreateCredentialResponse",
      "number",
      [
        "number", // const uint8_t pub[OPAQUE_USER_SESSION_PUBLIC_LEN],
        "number", // const uint8_t rec[OPAQUE_USER_RECORD_LEN/*+envU_len*/],
        "string", // const uint8_t *ids_idU,
        "number", // const uint16_t ids_idU_len,
        "string", // const uint8_t *ids_idS,
        "number", // const uint16_t ids_idS_len,
        "string", // const uint8_t *app_info,
        "number", // const size_t app_info_len,
        "string", // const uint8_t *app_einfo,
        "number", // const size_t app_einfo_len,
        "number", // uint8_t resp[OPAQUE_SERVER_SESSION_LEN/*+envU_len*/],
        "number", // uint8_t sk[crypto_secretbox_KEYBYTES],
        "number", // uint8_t sec[OPAQUE_SERVER_AUTH_CTX_LEN]);
      ]
    );
    function createCredentialResponse(module, params) {
      const pointers = [];
      try {
        const {
          pub, // required
          rec, // required
          cfg, // required
          ids, // required
          infos, // optional
        } = params;
        const app_info = infos || {};
        validateUint8Arrays({ pub, rec });
        validateRequiredStrings(ids);
        validateOptionalStrings(app_info);
        validatePkgConfig(cfg);

        const pub_pointer = AllocatedBuf.fromUint8Array(
          pub,
          module.OPAQUE_USER_SESSION_PUBLIC_LEN,
          module
        );
        pointers.push(pub_pointer);
        const envU_len = module.getEnvelopeLen({ cfg, ids });
        const rec_pointer = AllocatedBuf.fromUint8Array(
          rec,
          module.OPAQUE_USER_RECORD_LEN + envU_len,
          module
        );
        pointers.push(rec_pointer);

        const resp_pointer = new AllocatedBuf(
          module.OPAQUE_SERVER_SESSION_LEN + envU_len,
          module
        );
        pointers.push(resp_pointer);
        const sk_pointer = new AllocatedBuf(
          module.crypto_secretbox_KEYBYTES,
          module
        );
        pointers.push(sk_pointer);
        const sec_pointer = new AllocatedBuf(
          module.OPAQUE_SERVER_AUTH_CTX_LEN,
          module
        );
        pointers.push(sec_pointer);
        sec_pointer.zero();

        if (
          0 !==
          module.CreateCredentialResponse(
            pub_pointer.address,
            rec_pointer.address,
            ids.idU,
            ids.idU.length,
            ids.idS,
            ids.idS.length,
            app_info.info,
            app_info.info != null ? app_info.info.length : 0,
            app_info.einfo,
            app_info.einfo != null ? app_info.einfo.length : 0,
            resp_pointer.address,
            sk_pointer.address,
            sec_pointer.address
          )
        ) {
          const error = new Error("CreateCredentialResponse failed.");
          error.name = "OpaqueError";
          throw error;
        }
        return {
          resp: resp_pointer.toUint8Array(),
          sk: sk_pointer.toUint8Array(),
          sec: sec_pointer.toUint8Array(),
        };
      } catch (e) {
        if (e.name === "OpaqueError") throw e;
        const error = new Error(
          "createCredentialResponse failed. (" + e.name + ") " + e.message
        );
        error.name = "OpaqueError";
        error.cause = e;
        throw error;
      } finally {
        zeroAndFree(pointers);
      }
    }

    Module["recoverCredentials"] = (params) => {
      return recoverCredentials(Module, params);
    };
    Module["RecoverCredentials"] = Module.cwrap(
      "opaquejs_RecoverCredentials",
      "number",
      [
        "number", // const uint8_t resp[OPAQUE_SERVER_SESSION_LEN/*+envU_len*/],
        "number", // const uint8_t sec[OPAQUE_USER_SESSION_SECRET_LEN/*+pwdU_len*/],
        "number", // const uint8_t pkS[crypto_scalarmult_BYTES],
        "number", // const uint8_t cfg_skU,
        "number", // const uint8_t cfg_pkU,
        "number", // const uint8_t cfg_pkS,
        "number", // const uint8_t cfg_idS,
        "number", // const uint8_t cfg_idU,
        "string", // const uint8_t *app_info,
        "number", // const size_t app_info_len,
        "string", // const uint8_t *app_einfo,
        "number", // const size_t app_einfo_len,
        "number", // const uint8_t **ids_idU,
        "number", // const uint16_t *ids_idU_len,
        "number", // const uint8_t **ids_idS,
        "number", // const uint16_t *ids_idS_len,
        "number", // uint8_t *sk,
        "number", // uint8_t authU[crypto_auth_hmacsha256_BYTES],
        "number", // uint8_t export_key[crypto_hash_sha256_BYTES]);
      ]
    );
    function recoverCredentials(module, params) {
      const pointers = [];
      try {
        const {
          resp, // required
          sec, // required
          pkS, // optional (required if cfg_pkS == NotPackaged)
          cfg, // required
          infos, // optional
          ids, // optional (required if cfg_idU == NotPackaged or cfg_idS == NotPackaged)
          max_ids_idU_len, // optional (only applicable if cfg_idU != NotPackaged; the default is 64)
          max_ids_idS_len, // optional (only applicable if cfg_idU != NotPackaged; the default is 64)
        } = params;
        const app_info = infos || {};
        validateUint8Arrays({ resp, sec });
        validateOptionalStrings(app_info);
        validatePkgConfig(cfg);

        const resp_pointer = AllocatedBuf.fromUint8ArrayInexact(
          resp,
          module.OPAQUE_SERVER_SESSION_LEN /*+envU_len*/,
          module
        );
        pointers.push(resp_pointer);
        const sec_pointer = AllocatedBuf.fromUint8ArrayInexact(
          sec,
          module.OPAQUE_USER_SESSION_SECRET_LEN /*+pwdU_len*/,
          module
        );
        pointers.push(sec_pointer);

        let pkS_pointer;
        if (cfg.pkS == module.NotPackaged) {
          validateUint8Arrays({ pkS });
          pkS_pointer = AllocatedBuf.fromUint8Array(
            pkS,
            module.crypto_scalarmult_BYTES,
            module
          );
          pointers.push(pkS_pointer);
        }

        // uint16_t has 16 bits = 2 bytes.
        const ids1_idU_len_pointer = new AllocatedBuf(2, module);
        pointers.push(ids1_idU_len_pointer);
        const ids1_idS_len_pointer = new AllocatedBuf(2, module);
        pointers.push(ids1_idS_len_pointer);
        // 32 bits handles the maximum memory size in bytes (2 GB = 2147483648
        // bytes). See
        // https://github.com/emscripten-core/emscripten/blob/2.0.11/src/settings.js .
        // 32 bits = 4 bytes.
        const ids1_idU_pointer_pointer = new AllocatedBuf(4, module);
        pointers.push(ids1_idU_pointer_pointer);
        const ids1_idS_pointer_pointer = new AllocatedBuf(4, module);
        pointers.push(ids1_idS_pointer_pointer);

        // If the IDs are not in the envelope, we must provide them beforehand. If
        // they are in the envelope, we use the IDs in the envelope.
        let ids1_idU_pointer;
        if (cfg.idU === module.NotPackaged) {
          validateRequiredStrings({ ids_idU: ids.idU });
          module.setValue(ids1_idU_len_pointer.address, ids.idU.length, "i16");
          // ccall uses stringToUTF8 for string arguments. See
          // https://github.com/emscripten-core/emscripten/blob/2.0.11/src/preamble.js.
          // At most there are 4 bytes per UTF-8 code point. Add +1 for the
          // trailing '\0'.
          ids1_idU_pointer = new AllocatedBuf(
            (ids.idU.length << 2) + 1,
            module
          );
          pointers.push(ids1_idU_pointer);
          module.stringToUTF8(
            ids.idU,
            ids1_idU_pointer.address,
            ids1_idU_pointer.length
          );
        } else {
          // ids1_idU_pointer must be big enough to fit idU.
          const ids1_idU_len =
            Number.isInteger(max_ids_idU_len) && max_ids_idU_len > 0
              ? max_ids_idU_len
              : 64;
          module.setValue(ids1_idU_len_pointer.address, ids1_idU_len, "i16");
          ids1_idU_pointer = new AllocatedBuf(ids1_idU_len, module);
          pointers.push(ids1_idU_pointer);
        }
        module.setValue(
          ids1_idU_pointer_pointer.address,
          ids1_idU_pointer.address,
          "i32"
        );

        let ids1_idS_pointer;
        if (cfg.idS === module.NotPackaged) {
          validateRequiredStrings({ ids_idS: ids.idS });
          let ids_idS_len = ids.idS.length;
          module.setValue(ids1_idS_len_pointer.address, ids_idS_len, "i16");
          // ccall uses stringToUTF8 for string arguments. See
          // https://github.com/emscripten-core/emscripten/blob/2.0.11/src/preamble.js.
          // At most there are 4 bytes per UTF-8 code point. Add +1 for the
          // trailing '\0'.
          ids1_idS_pointer = new AllocatedBuf(
            (ids.idS.length << 2) + 1,
            module
          );
          pointers.push(ids1_idS_pointer);
          module.stringToUTF8(
            ids.idS,
            ids1_idS_pointer.address,
            ids1_idS_pointer.length
          );
        } else {
          // ids1_idS_pointer must be big enough to fit idS.
          const ids1_idS_len =
            Number.isInteger(max_ids_idS_len) && max_ids_idS_len > 0
              ? max_ids_idS_len
              : 64;
          module.setValue(ids1_idS_len_pointer.address, ids1_idS_len, "i16");
          ids1_idS_pointer = new AllocatedBuf(ids1_idS_len, module);
          pointers.push(ids1_idS_pointer);
        }
        module.setValue(
          ids1_idS_pointer_pointer.address,
          ids1_idS_pointer.address,
          "i32"
        );

        const sk_pointer = new AllocatedBuf(
          module.crypto_secretbox_KEYBYTES,
          module
        );
        pointers.push(sk_pointer);
        const authU_pointer = new AllocatedBuf(
          module.crypto_auth_hmacsha256_BYTES,
          module
        );
        pointers.push(authU_pointer);
        const export_key_pointer = new AllocatedBuf(
          module.crypto_hash_sha256_BYTES,
          module
        );
        pointers.push(export_key_pointer);

        if (
          0 !==
          module.RecoverCredentials(
            resp_pointer.address,
            sec_pointer.address,
            pkS_pointer ? pkS_pointer.address : null,
            cfg.skU,
            cfg.pkU,
            cfg.pkS,
            cfg.idS,
            cfg.idU,
            app_info.info,
            app_info.info != null ? app_info.info.length : 0,
            app_info.einfo,
            app_info.einfo != null ? app_info.einfo.length : 0,
            ids1_idU_pointer_pointer.address,
            ids1_idU_len_pointer.address,
            ids1_idS_pointer_pointer.address,
            ids1_idS_len_pointer.address,
            sk_pointer.address,
            authU_pointer.address,
            export_key_pointer.address
          )
        ) {
          const error = new Error("RecoverCredentials failed.");
          error.name = "OpaqueError";
          throw error;
        }
        return {
          ids: {
            idU: module.UTF8ToString(
              ids1_idU_pointer.address,
              module.getValue(ids1_idU_len_pointer.address, "i16")
            ),
            idS: module.UTF8ToString(
              ids1_idS_pointer.address,
              module.getValue(ids1_idS_len_pointer.address, "i16")
            ),
          },
          sk: sk_pointer.toUint8Array(),
          authU: authU_pointer.toUint8Array(),
          export_key: export_key_pointer.toUint8Array(),
        };
      } catch (e) {
        if (e.name === "OpaqueError") throw e;
        const error = new Error(
          "recoverCredentials failed. (" + e.name + ") " + e.message
        );
        error.name = "OpaqueError";
        error.cause = e;
        throw error;
      } finally {
        zeroAndFree(pointers);
      }
    }

    Module["userAuth"] = (params) => {
      return userAuth(Module, params);
    };
    Module["UserAuth"] = Module.cwrap("opaquejs_UserAuth", "number", [
      "number", // uint8_t sec[OPAQUE_SERVER_AUTH_CTX_LEN],
      "number", // const uint8_t authU[crypto_auth_hmacsha256_BYTES]);
    ]);
    function userAuth(module, params) {
      const pointers = [];
      try {
        const {
          sec, // required
          authU, // required
        } = params;
        validateUint8Arrays({ sec, authU });
        const sec_pointer = AllocatedBuf.fromUint8Array(
          sec,
          module.OPAQUE_SERVER_AUTH_CTX_LEN,
          module
        );
        pointers.push(sec_pointer);
        const authU_pointer = AllocatedBuf.fromUint8Array(
          authU,
          module.crypto_auth_hmacsha256_BYTES,
          module
        );
        pointers.push(authU_pointer);
        return (
          0 === module.UserAuth(sec_pointer.address, authU_pointer.address)
        );
      } catch (e) {
        if (e.name === "OpaqueError") throw e;
        const error = new Error(
          "userAuth failed. (" + e.name + ") " + e.message
        );
        error.name = "OpaqueError";
        error.cause = e;
        throw error;
      } finally {
        zeroAndFree(pointers);
      }
    }

    Module["createRegistrationRequest"] = (params) => {
      return createRegistrationRequest(Module, params);
    };
    Module["CreateRegistrationRequest"] = Module.cwrap(
      "opaquejs_CreateRegistrationRequest",
      "number",
      [
        "string", // const uint8_t *pwdU,
        "number", // const uint16_t pwdU_len,
        "number", // uint8_t sec[OPAQUE_REGISTER_USER_SEC_LEN+pwdU_len],
        "number", // uint8_t M[crypto_core_ristretto255_BYTES]);
      ]
    );
    function createRegistrationRequest(module, params) {
      const pointers = [];
      try {
        const { pwdU } = params; // required
        validateRequiredStrings({ pwdU });
        const pwdU_len = pwdU.length;
        const sec_pointer = new AllocatedBuf(
          module.OPAQUE_REGISTER_USER_SEC_LEN + pwdU_len,
          module
        );
        pointers.push(sec_pointer);
        const M_pointer = new AllocatedBuf(
          module.crypto_core_ristretto255_BYTES,
          module
        );
        pointers.push(M_pointer);
        if (
          0 !==
          module.CreateRegistrationRequest(
            pwdU,
            pwdU_len,
            sec_pointer.address,
            M_pointer.address
          )
        ) {
          const error = new Error("CreateRegistrationRequest failed.");
          error.name = "OpaqueError";
          throw error;
        }
        return {
          sec: sec_pointer.toUint8Array(),
          M: M_pointer.toUint8Array(),
        };
      } catch (e) {
        if (e.name === "OpaqueError") throw e;
        const error = new Error(
          "createRegistrationRequest failed. (" + e.name + ") " + e.message
        );
        error.name = "OpaqueError";
        error.cause = e;
        throw error;
      } finally {
        zeroAndFree(pointers);
      }
    }

    Module["createRegistrationResponse"] = (params) => {
      return createRegistrationResponse(Module, params);
    };
    Module["CreateRegistrationResponse"] = Module.cwrap(
      "opaquejs_CreateRegistrationResponse",
      "number",
      [
        "number", // const uint8_t M[crypto_core_ristretto255_BYTES],
        "number", // uint8_t sec[OPAQUE_REGISTER_SECRET_LEN],
        "number", // uint8_t pub[OPAQUE_REGISTER_PUBLIC_LEN]);
      ]
    );
    function createRegistrationResponse(module, params) {
      const pointers = [];
      try {
        const { M } = params; // required
        validateUint8Arrays({ M });
        const M_pointer = AllocatedBuf.fromUint8Array(
          M,
          module.crypto_core_ristretto255_BYTES,
          module
        );
        pointers.push(M_pointer);
        const sec_pointer = new AllocatedBuf(
          module.OPAQUE_REGISTER_SECRET_LEN,
          module
        );
        pointers.push(sec_pointer);
        const pub_pointer = new AllocatedBuf(
          module.OPAQUE_REGISTER_PUBLIC_LEN,
          module
        );
        pointers.push(pub_pointer);
        if (
          0 !==
          module.CreateRegistrationResponse(
            M_pointer.address,
            sec_pointer.address,
            pub_pointer.address
          )
        ) {
          const error = new Error("CreateRegistrationResponse failed.");
          error.name = "OpaqueError";
          throw error;
        }
        return {
          sec: sec_pointer.toUint8Array(),
          pub: pub_pointer.toUint8Array(),
        };
      } catch (e) {
        if (e.name === "OpaqueError") throw e;
        const error = new Error(
          "createRegistrationResponse failed. (" + e.name + ") " + e.message
        );
        error.name = "OpaqueError";
        error.cause = e;
        throw error;
      } finally {
        zeroAndFree(pointers);
      }
    }

    Module["create1kRegistrationResponse"] = (params) => {
      return create1kRegistrationResponse(Module, params);
    };
    Module["Create1kRegistrationResponse"] = Module.cwrap(
      "opaquejs_Create1kRegistrationResponse",
      "number",
      [
        "number", // const uint8_t M[crypto_core_ristretto255_BYTES],
        "number", // const uint8_t pkS[crypto_scalarmult_BYTES],
        "number", // uint8_t sec[OPAQUE_REGISTER_SECRET_LEN],
        "number", // uint8_t pub[OPAQUE_REGISTER_PUBLIC_LEN]);
      ]
    );
    function create1kRegistrationResponse(module, params) {
      const pointers = [];
      try {
        const {
          M, // required
          pkS, // required
        } = params;
        validateUint8Arrays({ M, pkS });
        const M_pointer = AllocatedBuf.fromUint8Array(
          M,
          module.crypto_core_ristretto255_BYTES,
          module
        );
        pointers.push(M_pointer);
        const pkS_pointer = AllocatedBuf.fromUint8Array(
          pkS,
          module.crypto_scalarmult_BYTES,
          module
        );
        pointers.push(pkS_pointer);
        const sec_pointer = new AllocatedBuf(
          module.OPAQUE_REGISTER_SECRET_LEN,
          module
        );
        pointers.push(sec_pointer);
        const pub_pointer = new AllocatedBuf(
          module.OPAQUE_REGISTER_PUBLIC_LEN,
          module
        );
        pointers.push(pub_pointer);
        if (
          0 !==
          module.Create1kRegistrationResponse(
            M_pointer.address,
            pkS_pointer.address,
            sec_pointer.address,
            pub_pointer.address
          )
        ) {
          const error = new Error("Create1kRegistrationResponse failed.");
          error.name = "OpaqueError";
          throw error;
        }
        return {
          sec: sec_pointer.toUint8Array(),
          pub: pub_pointer.toUint8Array(),
        };
      } catch (e) {
        if (e.name === "OpaqueError") throw e;
        const error = new Error(
          "create1kRegistrationResponse failed. (" + e.name + ") " + e.message
        );
        error.name = "OpaqueError";
        error.cause = e;
        throw error;
      } finally {
        zeroAndFree(pointers);
      }
    }

    Module["finalizeRequest"] = (params) => {
      return finalizeRequest(Module, params);
    };
    Module["FinalizeRequest"] = Module.cwrap(
      "opaquejs_FinalizeRequest",
      "number",
      [
        "number", // const uint8_t sec[OPAQUE_REGISTER_USER_SEC_LEN/*+pwdU_len*/],
        "number", // const uint8_t pub[OPAQUE_REGISTER_PUBLIC_LEN],
        "number", // const uint8_t cfg_skU,
        "number", // const uint8_t cfg_pkU,
        "number", // const uint8_t cfg_pkS,
        "number", // const uint8_t cfg_idS,
        "number", // const uint8_t cfg_idU,
        "string", // const uint8_t *ids_idU,
        "number", // const uint16_t ids_idU_len,
        "string", // const uint8_t *ids_idS,
        "number", // const uint16_t ids_idS_len,
        "number", // uint8_t rec[OPAQUE_USER_RECORD_LEN/*+envU_len*/],
        "number", // uint8_t export_key[crypto_hash_sha256_BYTES]);
      ]
    );
    function finalizeRequest(module, params) {
      const pointers = [];
      try {
        const {
          sec, // required
          pub, // required
          cfg, // required
          ids, // required
        } = params;
        validateUint8Arrays({ sec, pub });
        validatePkgConfig(cfg);
        validateRequiredStrings(ids);

        const sec_pointer = AllocatedBuf.fromUint8ArrayInexact(
          sec,
          module.OPAQUE_REGISTER_USER_SEC_LEN /*+pwdU_len*/,
          module
        );
        pointers.push(sec_pointer);
        const pub_pointer = AllocatedBuf.fromUint8Array(
          pub,
          module.OPAQUE_REGISTER_PUBLIC_LEN,
          module
        );
        pointers.push(pub_pointer);

        const envU_len = module.getEnvelopeLen({ cfg, ids });
        const rec_pointer = new AllocatedBuf(
          module.OPAQUE_USER_RECORD_LEN + envU_len,
          module
        );
        pointers.push(rec_pointer);
        const export_key_pointer = new AllocatedBuf(
          module.crypto_hash_sha256_BYTES,
          module
        );
        pointers.push(export_key_pointer);

        if (
          0 !==
          module.FinalizeRequest(
            sec_pointer.address,
            pub_pointer.address,
            cfg.skU,
            cfg.pkU,
            cfg.pkS,
            cfg.idS,
            cfg.idU,
            ids.idU,
            ids.idU.length,
            ids.idS,
            ids.idS.length,
            rec_pointer.address,
            export_key_pointer.address
          )
        ) {
          const error = new Error("FinalizeRequest failed.");
          error.name = "OpaqueError";
          throw error;
        }
        return {
          rec: rec_pointer.toUint8Array(),
          export_key: export_key_pointer.toUint8Array(),
        };
      } catch (e) {
        if (e.name === "OpaqueError") throw e;
        const error = new Error(
          "finalizeRequest failed. (" + e.name + ") " + e.message
        );
        error.name = "OpaqueError";
        error.cause = e;
        throw error;
      } finally {
        zeroAndFree(pointers);
      }
    }

    Module["storeUserRecord"] = (params) => {
      return storeUserRecord(Module, params);
    };
    Module["StoreUserRecord"] = Module.cwrap("opaquejs_StoreUserRecord", null, [
      "number", // const uint8_t sec[OPAQUE_REGISTER_SECRET_LEN],
      "number", // uint8_t rec[OPAQUE_USER_RECORD_LEN/*+envU_len*/]);
    ]);
    function storeUserRecord(module, params) {
      const pointers = [];
      try {
        const {
          sec, // required
          rec, // required
        } = params;
        validateUint8Arrays({ sec, rec });
        const sec_pointer = AllocatedBuf.fromUint8Array(
          sec,
          module.OPAQUE_REGISTER_SECRET_LEN,
          module
        );
        pointers.push(sec_pointer);
        const rec_pointer = AllocatedBuf.fromUint8ArrayInexact(
          rec,
          module.OPAQUE_USER_RECORD_LEN /*+envU_len*/,
          module
        );
        pointers.push(rec_pointer);
        module.StoreUserRecord(sec_pointer.address, rec_pointer.address);
        return {
          rec: rec_pointer.toUint8Array(),
        };
      } catch (e) {
        if (e.name === "OpaqueError") throw e;
        const error = new Error(
          "storeUserRecord failed. (" + e.name + ") " + e.message
        );
        error.name = "OpaqueError";
        error.cause = e;
        throw error;
      } finally {
        zeroAndFree(pointers);
      }
    }

    Module["store1kUserRecord"] = (params) => {
      return store1kUserRecord(Module, params);
    };
    Module["Store1kUserRecord"] = Module.cwrap(
      "opaquejs_Store1kUserRecord",
      null,
      [
        "number", // const uint8_t sec[OPAQUE_REGISTER_SECRET_LEN],
        "number", // const uint8_t skS[crypto_scalarmult_SCALARBYTES],
        "number", // uint8_t rec[OPAQUE_USER_RECORD_LEN/*+envU_len*/]);
      ]
    );
    function store1kUserRecord(module, params) {
      const pointers = [];
      try {
        const {
          sec, // required
          skS, // required
          rec, // required
        } = params;
        validateUint8Arrays({ sec, skS, rec });
        const sec_pointer = AllocatedBuf.fromUint8Array(
          sec,
          module.OPAQUE_REGISTER_SECRET_LEN,
          module
        );
        pointers.push(sec_pointer);
        const skS_pointer = AllocatedBuf.fromUint8Array(
          skS,
          module.crypto_scalarmult_SCALARBYTES,
          module
        );
        pointers.push(skS_pointer);
        const rec_pointer = AllocatedBuf.fromUint8ArrayInexact(
          rec,
          module.OPAQUE_USER_RECORD_LEN /*+envU_len*/,
          module
        );
        pointers.push(rec_pointer);
        module.Store1kUserRecord(
          sec_pointer.address,
          skS_pointer.address,
          rec_pointer.address
        );
        return {
          rec: rec_pointer.toUint8Array(),
        };
      } catch (e) {
        if (e.name === "OpaqueError") throw e;
        const error = new Error(
          "store1kUserRecord failed. (" + e.name + ") " + e.message
        );
        error.name = "OpaqueError";
        error.cause = e;
        throw error;
      } finally {
        zeroAndFree(pointers);
      }
    }

    Module["getEnvelopeLen"] = (params) => {
      return getEnvelopeLen(Module, params);
    };
    Module["envelope_len"] = Module.cwrap("opaquejs_envelope_len", "number", [
      "number", // const uint8_t cfg_skU,
      "number", // const uint8_t cfg_pkU,
      "number", // const uint8_t cfg_pkS,
      "number", // const uint8_t cfg_idS,
      "number", // const uint8_t cfg_idU,
      "string", // const uint8_t *ids_idU,
      "number", // const uint16_t ids_idU_len,
      "string", // const uint8_t *ids_idS,
      "number", // const uint16_t ids_idS_len,
      "number", // uint32_t *envU_len
    ]);
    function getEnvelopeLen(module, params) {
      const pointers = [];
      try {
        const {
          cfg, // required
          ids, // required
        } = params;
        validateRequiredStrings(ids);
        validatePkgConfig(cfg);

        // uint32_t has 32 bits = 4 bytes.
        const envU_len_pointer = new AllocatedBuf(4, module);
        pointers.push(envU_len_pointer);
        if (
          0 !==
          module.envelope_len(
            cfg.skU,
            cfg.pkU,
            cfg.pkS,
            cfg.idS,
            cfg.idU,
            ids.idU,
            ids.idU.length,
            ids.idS,
            ids.idS.length,
            envU_len_pointer.address
          )
        ) {
          throw new Error("getEnvelopeLen failed.");
        }
        return module.getValue(envU_len_pointer.address, "i32");
      } catch (e) {
        if (e.name === "OpaqueError") throw e;
        const error = new Error(
          "register failed. (" + e.name + ") " + e.message
        );
        error.name = "OpaqueError";
        error.cause = e;
        throw error;
      } finally {
        zeroAndFree(pointers);
      }
    }

    Module["getServerPublicKeyFromUserRecord"] = (rec_base16) => {
      return getServerPublicKeyFromUserRecord(Module, rec_base16);
    };
    Module["server_public_key_from_user_record"] = Module.cwrap(
      "opaquejs_server_public_key_from_user_record",
      null,
      [
        "number", // const uint8_t rec[OPAQUE_USER_RECORD_LEN],
        "number", // uint8_t pkS[crypto_scalarmult_BYTES]);
      ]
    );
    function getServerPublicKeyFromUserRecord(module, rec) {
      const pointers = [];
      try {
        validateUint8Arrays({ rec });
        const rec_pointer = AllocatedBuf.fromUint8Array(
          rec,
          module.OPAQUE_USER_RECORD_LEN,
          module
        );
        pointers.push(rec_pointer);
        const pkS_pointer = new AllocatedBuf(
          module.crypto_scalarmult_BYTES,
          module
        );
        pointers.push(pkS_pointer);
        module.server_public_key_from_user_record(
          rec_pointer.address,
          pkS_pointer.address
        );
        return {
          pks: pkS_pointer.toUint8Array(),
        };
      } catch (e) {
        if (e.name === "OpaqueError") throw e;
        const error = new Error(
          "getServerPublicKeyFromUserRecord failed. (" +
            e.name +
            ") " +
            e.message
        );
        error.name = "OpaqueError";
        error.cause = e;
        throw error;
      } finally {
        zeroAndFree(pointers);
      }
    }

    // The following is from
    // https://github.com/jedisct1/libsodium/blob/2f915846ff41191c1a17357f0efaae9d500e9858/src/libsodium/randombytes/randombytes.c .
    // We can remove it once we upgrade libsodium to a version strictly greater
    // than 1.0.18.
    Module["getRandomValue"] = getRandomValueFunction();
    function getRandomValueFunction() {
      try {
        var window_ = "object" === typeof window ? window : self;
        var crypto_ =
          typeof window_.crypto !== "undefined"
            ? window_.crypto
            : window_.msCrypto;
        var randomValuesStandard = function () {
          var buf = new Uint32Array(1);
          crypto_.getRandomValues(buf);
          return buf[0] >>> 0;
        };
        randomValuesStandard();
        return randomValuesStandard;
      } catch (e) {
        try {
          var crypto = require("crypto");
          var randomValueNodeJS = function () {
            var buf = crypto["randomBytes"](4);
            return (
              ((buf[0] << 24) | (buf[1] << 16) | (buf[2] << 8) | buf[3]) >>> 0
            );
          };
          randomValueNodeJS();
          return randomValueNodeJS;
        } catch (e) {
          throw "No secure random number generator found";
        }
      }
    }

    Module["hexToUint8Array"] = hexToUint8Array;
    function hexToUint8Array(hex, length, array, index) {
      if (length == null && hex.length % 2 === 1)
        throw new TypeError("The hex string must have a length that is even.");
      const locLength = length != null ? length : hex.length / 2;
      const locArray = array != null ? array : new Array(length);
      const i = index != null ? index : 0;
      if (i >= locLength) return new Uint8Array(locArray);
      locArray[i] = parseInt(hex.substring(i * 2, (i + 1) * 2), 16);
      return hexToUint8Array(hex, locLength, locArray, i + 1);
    }

    Module["uint8ArrayEquals"] = uint8ArrayEquals;
    function uint8ArrayEquals(a, b, index) {
      if (index == null) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
      }
      const i = index != null ? index : 0;
      if (i >= a.length) return true;
      if (a[i] !== b[i]) return false;
      return uint8ArrayEquals(a, b, i + 1);
    }

    Module["uint8ArrayToHex"] = uint8ArrayToHex;
    function uint8ArrayToHex(buffer, hex, index) {
      const locBase16String = hex != null ? hex : "";
      const i = index != null ? index : 0;
      if (i >= buffer.length) return locBase16String;
      // -128 to 127
      const base10SignedByte = buffer[i];
      // 0 to 255
      const base10UnsignedByte =
        base10SignedByte < 0 ? base10SignedByte + 256 : base10SignedByte;
      const base16UnsignedByte = base10UnsignedByte.toString(16);
      const prefix = base16UnsignedByte.length < 2 ? "0" : "";
      return uint8ArrayToHex(
        buffer,
        locBase16String + prefix + base16UnsignedByte,
        i + 1
      );
    }
  }

  // See https://github.com/jedisct1/libsodium.js/blob/master/wrapper/wrap-template.js.
  function AllocatedBuf(length, module) {
    this.length = length;
    this.address = module._malloc(length);
    this.module = module;
  }

  AllocatedBuf.fromUint8Array = function (array, length, module) {
    if (array.length !== length)
      throw new TypeError(
        "The Uint8Array must have a length of " +
          length +
          ", not " +
          array.length +
          "."
      );
    const buffer = new AllocatedBuf(array.length, module);
    module.HEAPU8.set(array, buffer.address);
    return buffer;
  };

  AllocatedBuf.fromUint8ArrayInexact = function (array, length, module) {
    if (array.length <= length)
      throw new TypeError(
        "The Uint8Array must have a length of at least " +
          length +
          " exclusive, not " +
          array.length +
          "."
      );
    const buffer = new AllocatedBuf(array.length, module);
    module.HEAPU8.set(array, buffer.address);
    return buffer;
  };

  AllocatedBuf.prototype.toUint8Array = function () {
    const buffer = new Uint8Array(this.length);
    buffer.set(
      this.module.HEAPU8.subarray(this.address, this.address + this.length)
    );
    return buffer;
  };

  AllocatedBuf.prototype.zero = function (index) {
    const i = index != null ? index : 0;
    if (i >= this.length) return;
    this.module.setValue(this.address + i, 0, "i8");
    return this.zero(i + 1);
  };

  AllocatedBuf.prototype.zeroAndFree = function () {
    this.zero();
    this.module._free(this.address);
  };

  function validateOptionalStrings(object) {
    for (const [name, string] of Object.entries(object)) {
      if (string != null && (typeof string !== "string" || string.length < 1))
        throw new TypeError(
          "If defined, " + name + " must be a nonempty string."
        );
    }
  }

  function validatePkgConfig(cfg) {
    validatePkgTarget(cfg.skU, "cfg.skU");
    validatePkgTarget(cfg.pkU, "cfg.pkU");
    validatePkgTarget(cfg.pkS, "cfg.pkS");
    validatePkgTarget(cfg.idS, "cfg.idS");
    validatePkgTarget(cfg.idU, "cfg.idU");
  }

  function validatePkgTarget(cfg, name) {
    if (cfg !== 0 && cfg !== 1 && cfg !== 2)
      throw new RangeError(name + " (" + cfg + ") must be 0, 1, or 2.");
  }

  function validateRequiredStrings(object) {
    for (const [name, string] of Object.entries(object)) {
      if (typeof string !== "string" || string.length < 1)
        throw new TypeError(name + " must be a nonempty string.");
    }
  }

  function validateUint8Arrays(object) {
    for (const [name, buffer] of Object.entries(object)) {
      if (buffer == null)
        throw new TypeError(name + " must be a Uint8Array, not null.");
      else if (!(buffer instanceof Uint8Array))
        throw new TypeError(name + " must be a Uint8Array.");
      else if (buffer.length < 1)
        throw new TypeError(name + " cannot be empty.");
    }
  }

  function zeroAndFree(pointers, index) {
    const i = index != null ? index : 0;
    if (i >= pointers.length) return;
    pointers[i].zeroAndFree();
    return zeroAndFree(pointers, i + 1);
  }

  // This is similar to expose_libsodium in
  // https://github.com/jedisct1/libsodium.js/blob/master/wrapper/libsodium-pre.js .
  function exposeLibopaque(exports) {
    "use strict";
    var Module = exports;
    var _Module = Module;
    Module.ready = new Promise(function (resolve, reject) {
      var Module = _Module;
      Module.onAbort = reject;
      Module.onRuntimeInitialized = function () {
        try {
          wrapLibrary(Module);
          resolve();
        } catch (err) {
          reject(err);
        }
      };



// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
var key;
for (key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = function(status, toThrow) {
  throw toThrow;
};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;
ENVIRONMENT_IS_WEB = typeof window === 'object';
ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string';
ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;




// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var read_,
    readAsync,
    readBinary,
    setWindowTitle;

var nodeFS;
var nodePath;

if (ENVIRONMENT_IS_NODE) {
  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = require('path').dirname(scriptDirectory) + '/';
  } else {
    scriptDirectory = __dirname + '/';
  }




  read_ = function shell_read(filename, binary) {
    var ret = tryParseAsDataURI(filename);
    if (ret) {
      return binary ? ret : ret.toString();
    }
    if (!nodeFS) nodeFS = require('fs');
    if (!nodePath) nodePath = require('path');
    filename = nodePath['normalize'](filename);
    return nodeFS['readFileSync'](filename, binary ? null : 'utf8');
  };

  readBinary = function readBinary(filename) {
    var ret = read_(filename, true);
    if (!ret.buffer) {
      ret = new Uint8Array(ret);
    }
    assert(ret.buffer);
    return ret;
  };




  if (process['argv'].length > 1) {
    thisProgram = process['argv'][1].replace(/\\/g, '/');
  }

  arguments_ = process['argv'].slice(2);

  if (typeof module !== 'undefined') {
    module['exports'] = Module;
  }

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });

  process['on']('unhandledRejection', abort);

  quit_ = function(status) {
    process['exit'](status);
  };

  Module['inspect'] = function () { return '[Emscripten Module object]'; };



} else
if (ENVIRONMENT_IS_SHELL) {


  if (typeof read != 'undefined') {
    read_ = function shell_read(f) {
      var data = tryParseAsDataURI(f);
      if (data) {
        return intArrayToString(data);
      }
      return read(f);
    };
  }

  readBinary = function readBinary(f) {
    var data;
    data = tryParseAsDataURI(f);
    if (data) {
      return data;
    }
    if (typeof readbuffer === 'function') {
      return new Uint8Array(readbuffer(f));
    }
    data = read(f, 'binary');
    assert(typeof data === 'object');
    return data;
  };

  if (typeof scriptArgs != 'undefined') {
    arguments_ = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    arguments_ = arguments;
  }

  if (typeof quit === 'function') {
    quit_ = function(status) {
      quit(status);
    };
  }

  if (typeof print !== 'undefined') {
    // Prefer to use print/printErr where they exist, as they usually work better.
    if (typeof console === 'undefined') console = /** @type{!Console} */({});
    console.log = /** @type{!function(this:Console, ...*): undefined} */ (print);
    console.warn = console.error = /** @type{!function(this:Console, ...*): undefined} */ (typeof printErr !== 'undefined' ? printErr : print);
  }


} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  if (scriptDirectory.indexOf('blob:') !== 0) {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf('/')+1);
  } else {
    scriptDirectory = '';
  }


  // Differentiate the Web Worker from the Node Worker case, as reading must
  // be done differently.
  {




  read_ = function shell_read(url) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      return xhr.responseText;
    } catch (err) {
      var data = tryParseAsDataURI(url);
      if (data) {
        return intArrayToString(data);
      }
      throw err;
    }
  };

  if (ENVIRONMENT_IS_WORKER) {
    readBinary = function readBinary(url) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
        return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
      } catch (err) {
        var data = tryParseAsDataURI(url);
        if (data) {
          return data;
        }
        throw err;
      }
    };
  }

  readAsync = function readAsync(url, onload, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function xhr_onload() {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      var data = tryParseAsDataURI(url);
      if (data) {
        onload(data.buffer);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  };




  }

  setWindowTitle = function(title) { document.title = title };
} else
{
}


// Set up the out() and err() hooks, which are how we can print to stdout or
// stderr, respectively.
var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.warn.bind(console);

// Merge back in the overrides
for (key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = null;

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.
if (Module['arguments']) arguments_ = Module['arguments'];
if (Module['thisProgram']) thisProgram = Module['thisProgram'];
if (Module['quit']) quit_ = Module['quit'];

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message





// {{PREAMBLE_ADDITIONS}}

var STACK_ALIGN = 16;

function dynamicAlloc(size) {
  var ret = HEAP32[DYNAMICTOP_PTR>>2];
  var end = (ret + size + 15) & -16;
  HEAP32[DYNAMICTOP_PTR>>2] = end;
  return ret;
}

function alignMemory(size, factor) {
  if (!factor) factor = STACK_ALIGN; // stack alignment (16-byte) by default
  return Math.ceil(size / factor) * factor;
}

function getNativeTypeSize(type) {
  switch (type) {
    case 'i1': case 'i8': return 1;
    case 'i16': return 2;
    case 'i32': return 4;
    case 'i64': return 8;
    case 'float': return 4;
    case 'double': return 8;
    default: {
      if (type[type.length-1] === '*') {
        return 4; // A pointer
      } else if (type[0] === 'i') {
        var bits = Number(type.substr(1));
        assert(bits % 8 === 0, 'getNativeTypeSize invalid bits ' + bits + ', type ' + type);
        return bits / 8;
      } else {
        return 0;
      }
    }
  }
}

function warnOnce(text) {
  if (!warnOnce.shown) warnOnce.shown = {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    err(text);
  }
}








// Wraps a JS function as a wasm function with a given signature.
function convertJsFunctionToWasm(func, sig) {

  // If the type reflection proposal is available, use the new
  // "WebAssembly.Function" constructor.
  // Otherwise, construct a minimal wasm module importing the JS function and
  // re-exporting it.
  if (typeof WebAssembly.Function === "function") {
    var typeNames = {
      'i': 'i32',
      'j': 'i64',
      'f': 'f32',
      'd': 'f64'
    };
    var type = {
      parameters: [],
      results: sig[0] == 'v' ? [] : [typeNames[sig[0]]]
    };
    for (var i = 1; i < sig.length; ++i) {
      type.parameters.push(typeNames[sig[i]]);
    }
    return new WebAssembly.Function(type, func);
  }

  // The module is static, with the exception of the type section, which is
  // generated based on the signature passed in.
  var typeSection = [
    0x01, // id: section,
    0x00, // length: 0 (placeholder)
    0x01, // count: 1
    0x60, // form: func
  ];
  var sigRet = sig.slice(0, 1);
  var sigParam = sig.slice(1);
  var typeCodes = {
    'i': 0x7f, // i32
    'j': 0x7e, // i64
    'f': 0x7d, // f32
    'd': 0x7c, // f64
  };

  // Parameters, length + signatures
  typeSection.push(sigParam.length);
  for (var i = 0; i < sigParam.length; ++i) {
    typeSection.push(typeCodes[sigParam[i]]);
  }

  // Return values, length + signatures
  // With no multi-return in MVP, either 0 (void) or 1 (anything else)
  if (sigRet == 'v') {
    typeSection.push(0x00);
  } else {
    typeSection = typeSection.concat([0x01, typeCodes[sigRet]]);
  }

  // Write the overall length of the type section back into the section header
  // (excepting the 2 bytes for the section id and length)
  typeSection[1] = typeSection.length - 2;

  // Rest of the module is static
  var bytes = new Uint8Array([
    0x00, 0x61, 0x73, 0x6d, // magic ("\0asm")
    0x01, 0x00, 0x00, 0x00, // version: 1
  ].concat(typeSection, [
    0x02, 0x07, // import section
      // (import "e" "f" (func 0 (type 0)))
      0x01, 0x01, 0x65, 0x01, 0x66, 0x00, 0x00,
    0x07, 0x05, // export section
      // (export "f" (func 0 (type 0)))
      0x01, 0x01, 0x66, 0x00, 0x00,
  ]));

   // We can compile this wasm module synchronously because it is very small.
  // This accepts an import (at "e.f"), that it reroutes to an export (at "f")
  var module = new WebAssembly.Module(bytes);
  var instance = new WebAssembly.Instance(module, {
    'e': {
      'f': func
    }
  });
  var wrappedFunc = instance.exports['f'];
  return wrappedFunc;
}

var freeTableIndexes = [];

// Weak map of functions in the table to their indexes, created on first use.
var functionsInTableMap;

// Add a wasm function to the table.
function addFunctionWasm(func, sig) {
  var table = wasmTable;

  // Check if the function is already in the table, to ensure each function
  // gets a unique index. First, create the map if this is the first use.
  if (!functionsInTableMap) {
    functionsInTableMap = new WeakMap();
    for (var i = 0; i < table.length; i++) {
      var item = table.get(i);
      // Ignore null values.
      if (item) {
        functionsInTableMap.set(item, i);
      }
    }
  }
  if (functionsInTableMap.has(func)) {
    return functionsInTableMap.get(func);
  }

  // It's not in the table, add it now.


  var ret;
  // Reuse a free index if there is one, otherwise grow.
  if (freeTableIndexes.length) {
    ret = freeTableIndexes.pop();
  } else {
    ret = table.length;
    // Grow the table
    try {
      table.grow(1);
    } catch (err) {
      if (!(err instanceof RangeError)) {
        throw err;
      }
      throw 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.';
    }
  }

  // Set the new value.
  try {
    // Attempting to call this with JS function will cause of table.set() to fail
    table.set(ret, func);
  } catch (err) {
    if (!(err instanceof TypeError)) {
      throw err;
    }
    var wrapped = convertJsFunctionToWasm(func, sig);
    table.set(ret, wrapped);
  }

  functionsInTableMap.set(func, ret);

  return ret;
}

function removeFunctionWasm(index) {
  functionsInTableMap.delete(wasmTable.get(index));
  freeTableIndexes.push(index);
}

// 'sig' parameter is required for the llvm backend but only when func is not
// already a WebAssembly function.
function addFunction(func, sig) {

  return addFunctionWasm(func, sig);
}

function removeFunction(index) {
  removeFunctionWasm(index);
}



var funcWrappers = {};

function getFuncWrapper(func, sig) {
  if (!func) return; // on null pointer, return undefined
  assert(sig);
  if (!funcWrappers[sig]) {
    funcWrappers[sig] = {};
  }
  var sigCache = funcWrappers[sig];
  if (!sigCache[func]) {
    // optimize away arguments usage in common cases
    if (sig.length === 1) {
      sigCache[func] = function dynCall_wrapper() {
        return dynCall(sig, func);
      };
    } else if (sig.length === 2) {
      sigCache[func] = function dynCall_wrapper(arg) {
        return dynCall(sig, func, [arg]);
      };
    } else {
      // general case
      sigCache[func] = function dynCall_wrapper() {
        return dynCall(sig, func, Array.prototype.slice.call(arguments));
      };
    }
  }
  return sigCache[func];
}







function makeBigInt(low, high, unsigned) {
  return unsigned ? ((+((low>>>0)))+((+((high>>>0)))*4294967296.0)) : ((+((low>>>0)))+((+((high|0)))*4294967296.0));
}

/** @param {Array=} args */
function dynCall(sig, ptr, args) {
  if (args && args.length) {
    return Module['dynCall_' + sig].apply(null, [ptr].concat(args));
  } else {
    return Module['dynCall_' + sig].call(null, ptr);
  }
}

var tempRet0 = 0;

var setTempRet0 = function(value) {
  tempRet0 = value;
};

var getTempRet0 = function() {
  return tempRet0;
};


// The address globals begin at. Very low in memory, for code size and optimization opportunities.
// Above 0 is static memory, starting with globals.
// Then the stack.
// Then 'dynamic' memory for sbrk.
var GLOBAL_BASE = 1024;





// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html


var wasmBinary;if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];
var noExitRuntime;if (Module['noExitRuntime']) noExitRuntime = Module['noExitRuntime'];


if (typeof WebAssembly !== 'object') {
  abort('no native wasm support detected');
}




// In MINIMAL_RUNTIME, setValue() and getValue() are only available when building with safe heap enabled, for heap safety checking.
// In traditional runtime, setValue() and getValue() are always available (although their use is highly discouraged due to perf penalties)

/** @param {number} ptr
    @param {number} value
    @param {string} type
    @param {number|boolean=} noSafe */
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[((ptr)>>0)]=value; break;
      case 'i8': HEAP8[((ptr)>>0)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}

/** @param {number} ptr
    @param {string} type
    @param {number|boolean=} noSafe */
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for getValue: ' + type);
    }
  return null;
}






// Wasm globals

var wasmMemory;

// In fastcomp asm.js, we don't need a wasm Table at all.
// In the wasm backend, we polyfill the WebAssembly object,
// so this creates a (non-native-wasm) table for us.

var wasmTable = new WebAssembly.Table({
  'initial': 3,
  'maximum': 3 + 0,
  'element': 'anyfunc'
});




//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS = 0;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
  return func;
}

// C calling interface.
/** @param {string|null=} returnType
    @param {Array=} argTypes
    @param {Arguments|Array=} args
    @param {Object=} opts */
function ccall(ident, returnType, argTypes, args, opts) {
  // For fast lookup of conversion functions
  var toC = {
    'string': function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        var len = (str.length << 2) + 1;
        ret = stackAlloc(len);
        stringToUTF8(str, ret, len);
      }
      return ret;
    },
    'array': function(arr) {
      var ret = stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    }
  };

  function convertReturnValue(ret) {
    if (returnType === 'string') return UTF8ToString(ret);
    if (returnType === 'boolean') return Boolean(ret);
    return ret;
  }

  var func = getCFunc(ident);
  var cArgs = [];
  var stack = 0;
  if (args) {
    for (var i = 0; i < args.length; i++) {
      var converter = toC[argTypes[i]];
      if (converter) {
        if (stack === 0) stack = stackSave();
        cArgs[i] = converter(args[i]);
      } else {
        cArgs[i] = args[i];
      }
    }
  }
  var ret = func.apply(null, cArgs);

  ret = convertReturnValue(ret);
  if (stack !== 0) stackRestore(stack);
  return ret;
}

/** @param {string=} returnType
    @param {Array=} argTypes
    @param {Object=} opts */
function cwrap(ident, returnType, argTypes, opts) {
  argTypes = argTypes || [];
  // When the function takes numbers and returns a number, we can just return
  // the original function
  var numericArgs = argTypes.every(function(type){ return type === 'number'});
  var numericRet = returnType !== 'string';
  if (numericRet && numericArgs && !opts) {
    return getCFunc(ident);
  }
  return function() {
    return ccall(ident, returnType, argTypes, arguments, opts);
  }
}

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_DYNAMIC = 2; // Cannot be freed except through sbrk
var ALLOC_NONE = 3; // Do not allocate

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
/** @type {function((TypedArray|Array<number>|number), string, number, number=)} */
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc,
    stackAlloc,
    dynamicAlloc][allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var stop;
    ptr = ret;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)>>0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(/** @type {!Uint8Array} */ (slab), ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}

// Allocate memory during any stage of startup - static memory early on, dynamic memory later, malloc when ready
function getMemory(size) {
  if (!runtimeInitialized) return dynamicAlloc(size);
  return _malloc(size);
}




// runtime_strings.js: Strings related runtime functions that are part of both MINIMAL_RUNTIME and regular runtime.

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
// a copy of that string as a Javascript String object.

var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;

/**
 * @param {number} idx
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ArrayToString(heap, idx, maxBytesToRead) {
  var endIdx = idx + maxBytesToRead;
  var endPtr = idx;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  // (As a tiny code save trick, compare endPtr against endIdx using a negation, so that undefined means Infinity)
  while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;

  if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
    return UTF8Decoder.decode(heap.subarray(idx, endPtr));
  } else {
    var str = '';
    // If building with TextDecoder, we have already computed the string length above, so test loop end condition against that
    while (idx < endPtr) {
      // For UTF8 byte structure, see:
      // http://en.wikipedia.org/wiki/UTF-8#Description
      // https://www.ietf.org/rfc/rfc2279.txt
      // https://tools.ietf.org/html/rfc3629
      var u0 = heap[idx++];
      if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
      var u1 = heap[idx++] & 63;
      if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
      var u2 = heap[idx++] & 63;
      if ((u0 & 0xF0) == 0xE0) {
        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
      } else {
        u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heap[idx++] & 63);
      }

      if (u0 < 0x10000) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 0x10000;
        str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
      }
    }
  }
  return str;
}

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns a
// copy of that string as a Javascript String object.
// maxBytesToRead: an optional length that specifies the maximum number of bytes to read. You can omit
//                 this parameter to scan the string until the first \0 byte. If maxBytesToRead is
//                 passed, and the string at [ptr, ptr+maxBytesToReadr[ contains a null byte in the
//                 middle, then the string will cut short at that byte index (i.e. maxBytesToRead will
//                 not produce a string of exact length [ptr, ptr+maxBytesToRead[)
//                 N.B. mixing frequent uses of UTF8ToString() with and without maxBytesToRead may
//                 throw JS JIT optimizations off, so it is worth to consider consistently using one
//                 style or the other.
/**
 * @param {number} ptr
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ToString(ptr, maxBytesToRead) {
  return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
}

// Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
// encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   heap: the array to copy to. Each index in this array is assumed to be one 8-byte element.
//   outIdx: The starting offset in the array to begin the copying.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array.
//                    This count should include the null terminator,
//                    i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
//                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
    return 0;

  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) {
      var u1 = str.charCodeAt(++i);
      u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
    }
    if (u <= 0x7F) {
      if (outIdx >= endIdx) break;
      heap[outIdx++] = u;
    } else if (u <= 0x7FF) {
      if (outIdx + 1 >= endIdx) break;
      heap[outIdx++] = 0xC0 | (u >> 6);
      heap[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0xFFFF) {
      if (outIdx + 2 >= endIdx) break;
      heap[outIdx++] = 0xE0 | (u >> 12);
      heap[outIdx++] = 0x80 | ((u >> 6) & 63);
      heap[outIdx++] = 0x80 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      heap[outIdx++] = 0xF0 | (u >> 18);
      heap[outIdx++] = 0x80 | ((u >> 12) & 63);
      heap[outIdx++] = 0x80 | ((u >> 6) & 63);
      heap[outIdx++] = 0x80 | (u & 63);
    }
  }
  // Null-terminate the pointer to the buffer.
  heap[outIdx] = 0;
  return outIdx - startIdx;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8(str, outPtr, maxBytesToWrite) {
  return stringToUTF8Array(str, HEAPU8,outPtr, maxBytesToWrite);
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.
function lengthBytesUTF8(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) ++len;
    else if (u <= 0x7FF) len += 2;
    else if (u <= 0xFFFF) len += 3;
    else len += 4;
  }
  return len;
}





// runtime_strings_extra.js: Strings related runtime functions that are available only in regular runtime.

// Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function AsciiToString(ptr) {
  var str = '';
  while (1) {
    var ch = HEAPU8[((ptr++)>>0)];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.

function stringToAscii(str, outPtr) {
  return writeAsciiToMemory(str, outPtr, false);
}

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;

function UTF16ToString(ptr, maxBytesToRead) {
  var endPtr = ptr;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  var idx = endPtr >> 1;
  var maxIdx = idx + maxBytesToRead / 2;
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
  endPtr = idx << 1;

  if (endPtr - ptr > 32 && UTF16Decoder) {
    return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  } else {
    var i = 0;

    var str = '';
    while (1) {
      var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
      if (codeUnit == 0 || i == maxBytesToRead / 2) return str;
      ++i;
      // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
      str += String.fromCharCode(codeUnit);
    }
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
// Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF16(str, outPtr, maxBytesToWrite) {
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2; // Null terminator.
  var startPtr = outPtr;
  var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[((outPtr)>>1)]=codeUnit;
    outPtr += 2;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[((outPtr)>>1)]=0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF16(str) {
  return str.length*2;
}

function UTF32ToString(ptr, maxBytesToRead) {
  var i = 0;

  var str = '';
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(i >= maxBytesToRead / 4)) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0) break;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
  return str;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
// Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF32(str, outPtr, maxBytesToWrite) {
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[((outPtr)>>2)]=codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[((outPtr)>>2)]=0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF32(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
    len += 4;
  }

  return len;
}

// Allocate heap space for a JS string, and write it there.
// It is the responsibility of the caller to free() that memory.
function allocateUTF8(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = _malloc(size);
  if (ret) stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Allocate stack space for a JS string, and write it there.
function allocateUTF8OnStack(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = stackAlloc(size);
  stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Deprecated: This function should not be called because it is unsafe and does not provide
// a maximum length limit of how many bytes it is allowed to write. Prefer calling the
// function stringToUTF8Array() instead, which takes in a maximum length that can be used
// to be secure from out of bounds writes.
/** @deprecated
    @param {boolean=} dontAddNull */
function writeStringToMemory(string, buffer, dontAddNull) {
  warnOnce('writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!');

  var /** @type {number} */ lastChar, /** @type {number} */ end;
  if (dontAddNull) {
    // stringToUTF8Array always appends null. If we don't want to do that, remember the
    // character that existed at the location where the null will be placed, and restore
    // that after the write (below).
    end = buffer + lengthBytesUTF8(string);
    lastChar = HEAP8[end];
  }
  stringToUTF8(string, buffer, Infinity);
  if (dontAddNull) HEAP8[end] = lastChar; // Restore the value under the null character.
}

function writeArrayToMemory(array, buffer) {
  HEAP8.set(array, buffer);
}

/** @param {boolean=} dontAddNull */
function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    HEAP8[((buffer++)>>0)]=str.charCodeAt(i);
  }
  // Null-terminate the pointer to the HEAP.
  if (!dontAddNull) HEAP8[((buffer)>>0)]=0;
}



// Memory management

var PAGE_SIZE = 16384;
var WASM_PAGE_SIZE = 65536;
var ASMJS_PAGE_SIZE = 16777216;

function alignUp(x, multiple) {
  if (x % multiple > 0) {
    x += multiple - (x % multiple);
  }
  return x;
}

var HEAP,
/** @type {ArrayBuffer} */
  buffer,
/** @type {Int8Array} */
  HEAP8,
/** @type {Uint8Array} */
  HEAPU8,
/** @type {Int16Array} */
  HEAP16,
/** @type {Uint16Array} */
  HEAPU16,
/** @type {Int32Array} */
  HEAP32,
/** @type {Uint32Array} */
  HEAPU32,
/** @type {Float32Array} */
  HEAPF32,
/** @type {Float64Array} */
  HEAPF64;

function updateGlobalBufferAndViews(buf) {
  buffer = buf;
  Module['HEAP8'] = HEAP8 = new Int8Array(buf);
  Module['HEAP16'] = HEAP16 = new Int16Array(buf);
  Module['HEAP32'] = HEAP32 = new Int32Array(buf);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(buf);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(buf);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(buf);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(buf);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(buf);
}

var STATIC_BASE = 1024,
    STACK_BASE = 5278608,
    STACKTOP = STACK_BASE,
    STACK_MAX = 35728,
    DYNAMIC_BASE = 5278608,
    DYNAMICTOP_PTR = 35568;



var TOTAL_STACK = 5242880;

var INITIAL_INITIAL_MEMORY = Module['INITIAL_MEMORY'] || 16777216;









// In non-standalone/normal mode, we create the memory here.



// Create the main memory. (Note: this isn't used in STANDALONE_WASM mode since the wasm
// memory is created in the wasm, not in JS.)

  if (Module['wasmMemory']) {
    wasmMemory = Module['wasmMemory'];
  } else
  {
    wasmMemory = new WebAssembly.Memory({
      'initial': INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE
      ,
      'maximum': 2147483648 / WASM_PAGE_SIZE
    });
  }


if (wasmMemory) {
  buffer = wasmMemory.buffer;
}

// If the user provides an incorrect length, just use that length instead rather than providing the user to
// specifically provide the memory length with Module['INITIAL_MEMORY'].
INITIAL_INITIAL_MEMORY = buffer.byteLength;
updateGlobalBufferAndViews(buffer);

HEAP32[DYNAMICTOP_PTR>>2] = DYNAMIC_BASE;














function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback(Module); // Pass the module as the first argument.
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Module['dynCall_v'](func);
      } else {
        Module['dynCall_vi'](func, callback.arg);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;
var runtimeExited = false;


function preRun() {

  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  runtimeInitialized = true;
  
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  runtimeExited = true;
}

function postRun() {

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

/** @param {number|boolean=} ignore */
function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
/** @param {number|boolean=} ignore */
function reSign(value, bits, ignore) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}




// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc


var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_round = Math.round;
var Math_min = Math.min;
var Math_max = Math.max;
var Math_clz32 = Math.clz32;
var Math_trunc = Math.trunc;



// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled

function getUniqueRunDependency(id) {
  return id;
}

function addRunDependency(id) {
  runDependencies++;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

}

function removeRunDependency(id) {
  runDependencies--;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data

/** @param {string|number=} what */
function abort(what) {
  if (Module['onAbort']) {
    Module['onAbort'](what);
  }

  what += '';
  err(what);

  ABORT = true;
  EXITSTATUS = 1;

  what = 'abort(' + what + '). Build with -s ASSERTIONS=1 for more info.';

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  var e = new WebAssembly.RuntimeError(what);

  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}


var memoryInitializer = null;












function hasPrefix(str, prefix) {
  return String.prototype.startsWith ?
      str.startsWith(prefix) :
      str.indexOf(prefix) === 0;
}

// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

// Indicates whether filename is a base64 data URI.
function isDataURI(filename) {
  return hasPrefix(filename, dataURIPrefix);
}

var fileURIPrefix = "file://";

// Indicates whether filename is delivered via file protocol (as opposed to http/https)
function isFileURI(filename) {
  return hasPrefix(filename, fileURIPrefix);
}




var wasmBinaryFile = 'data:application/octet-stream;base64,AGFzbQEAAAABowIfYAJ/fwBgAn9/AX9gA39/fwBgAX8Bf2ADf39/AX9gAX8AYAABf2AEf39/fwF/YAR/f39/AGACf34AYAN/f34Bf2ABfwF+YAV/f39/fwF/YAAAYAl/f39/f39/f38Bf2AIf35/fn9+f38Bf2ACfn8BfmAHf39/f39/fwF/YAh/f39/f39/fwF/YA1/f39/f39/f39/f39/AX9gBH9/fn8Bf2AGf39/f39/AGALf39/f39/f39/f38AYAZ/f39/f38Bf2AKf39/f39/f39/fwF/YAx/f39/f39/f39/f38Bf2AOf39/f39/f39/f39/f38Bf2ATf39/f39/f39/f39/f39/f39/fwF/YAZ/f39/fn8Bf2AGf39/fn9/AX9gAn5+AX4CmQEHA2Vudg1fX2Fzc2VydF9mYWlsAAgDZW52BWFib3J0AA0DZW52FmVtc2NyaXB0ZW5fcmVzaXplX2hlYXAAAwNlbnYVZW1zY3JpcHRlbl9tZW1jcHlfYmlnAAQDZW52GGVtc2NyaXB0ZW5fYXNtX2NvbnN0X2lpaQAEA2VudgZtZW1vcnkCAYACgIACA2VudgV0YWJsZQFwAAMD/QH7AQYNBgYGBgYGBgYGBgYGBgYBGgcTGwEHBAcTAAIYAAEBAREIDAwSBwcRCAIWDgQSFQEHBAcXAAIIDAwECgEUFAMKCAABAQAACQADAwoIABABAAIJCgsBCxABBQsBBQkHCgkEAwUFHB0HCgQHAAACBwICBQAAHhAAAAAAAAkABQADAQECAAAACwcAARkODg8PDwEEAAsLAAAAAAICAgIFAAMCAAMAAAAAAAACAAUAAgUCAwUBAgACAgIAAAIDAQMEAAIAAAAFAgQDBQUAAgICAgAAAQIEAQQBBgAJBQwDAw0ABAEFAQMBBQEEAwMGAwUBBAADBAQDBgUDAwcEBhACfwFBkJfCAgt/AEHwlQILB/cIJxFfX3dhc21fY2FsbF9jdG9ycwAGJW9wYXF1ZWpzX2NyeXB0b19hdXRoX2htYWNzaGEyNTZfQllURVMABydvcGFxdWVqc19jcnlwdG9fY29yZV9yaXN0cmV0dG8yNTVfQllURVMACCFvcGFxdWVqc19jcnlwdG9faGFzaF9zaGEyNTZfQllURVMACSBvcGFxdWVqc19jcnlwdG9fc2NhbGFybXVsdF9CWVRFUwAKJm9wYXF1ZWpzX2NyeXB0b19zY2FsYXJtdWx0X1NDQUxBUkJZVEVTAAsib3BhcXVlanNfY3J5cHRvX3NlY3JldGJveF9LRVlCWVRFUwAMH29wYXF1ZWpzX09QQVFVRV9VU0VSX1JFQ09SRF9MRU4ADSNvcGFxdWVqc19PUEFRVUVfUkVHSVNURVJfUFVCTElDX0xFTgAOI29wYXF1ZWpzX09QQVFVRV9SRUdJU1RFUl9TRUNSRVRfTEVOAA8ib3BhcXVlanNfT1BBUVVFX1NFUlZFUl9TRVNTSU9OX0xFTgAQJW9wYXF1ZWpzX09QQVFVRV9SRUdJU1RFUl9VU0VSX1NFQ19MRU4AESdvcGFxdWVqc19PUEFRVUVfVVNFUl9TRVNTSU9OX1BVQkxJQ19MRU4AEidvcGFxdWVqc19PUEFRVUVfVVNFUl9TRVNTSU9OX1NFQ1JFVF9MRU4AEyNvcGFxdWVqc19PUEFRVUVfU0VSVkVSX0FVVEhfQ1RYX0xFTgAUGW9wYXF1ZWpzX0dlblNlcnZlcktleVBhaXIAFRFvcGFxdWVqc19SZWdpc3RlcgAWIG9wYXF1ZWpzX0NyZWF0ZUNyZWRlbnRpYWxSZXF1ZXN0ABchb3BhcXVlanNfQ3JlYXRlQ3JlZGVudGlhbFJlc3BvbnNlABgbb3BhcXVlanNfUmVjb3ZlckNyZWRlbnRpYWxzABkRb3BhcXVlanNfVXNlckF1dGgAGiJvcGFxdWVqc19DcmVhdGVSZWdpc3RyYXRpb25SZXF1ZXN0ABsjb3BhcXVlanNfQ3JlYXRlUmVnaXN0cmF0aW9uUmVzcG9uc2UAHCVvcGFxdWVqc19DcmVhdGUxa1JlZ2lzdHJhdGlvblJlc3BvbnNlAB0Yb3BhcXVlanNfRmluYWxpemVSZXF1ZXN0AB4Yb3BhcXVlanNfU3RvcmVVc2VyUmVjb3JkAB8ab3BhcXVlanNfU3RvcmUxa1VzZXJSZWNvcmQAIBVvcGFxdWVqc19lbnZlbG9wZV9sZW4AIStvcGFxdWVqc19zZXJ2ZXJfcHVibGljX2tleV9mcm9tX3VzZXJfcmVjb3JkACIQX19lcnJub19sb2NhdGlvbgDwAQRmcmVlAPIBBm1hbGxvYwDxAQlzdGFja1NhdmUA+gEMc3RhY2tSZXN0b3JlAPsB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IgMgACACEJ4BIAQgBCACQShqEJ4BIABB+ABqIgYgAkH4AGogAUH4AGoQngEgACABQdAAaiACQdAAahCeASAFIAAgABCgASAAIAMgBBChASAEIAMgBBCgASADIAUgBhCgASAGIAUgBhChASAFQTBqJAALjgISAX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/IAIoAgQhAyABKAIEIQQgAigCCCEFIAEoAgghBiACKAIMIQcgASgCDCEIIAIoAhAhCSABKAIQIQogAigCFCELIAEoAhQhDCACKAIYIQ0gASgCGCEOIAIoAhwhDyABKAIcIRAgAigCICERIAEoAiAhEiACKAIkIRMgASgCJCEUIAAgAigCACABKAIAajYCACAAIBMgFGo2AiQgACARIBJqNgIgIAAgDyAQajYCHCAAIA0gDmo2AhggACALIAxqNgIUIAAgCSAKajYCECAAIAcgCGo2AgwgACAFIAZqNgIIIAAgAyAEajYCBAuOAhIBfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8gAigCBCEDIAEoAgQhBCACKAIIIQUgASgCCCEGIAIoAgwhByABKAIMIQggAigCECEJIAEoAhAhCiACKAIUIQsgASgCFCEMIAIoAhghDSABKAIYIQ4gAigCHCEPIAEoAhwhECACKAIgIREgASgCICESIAIoAiQhEyABKAIkIRQgACABKAIAIAIoAgBrNgIAIAAgFCATazYCJCAAIBIgEWs2AiAgACAQIA9rNgIcIAAgDiANazYCGCAAIAwgC2s2AhQgACAKIAlrNgIQIAAgCCAHazYCDCAAIAYgBWs2AgggACAEIANrNgIECxYAIABBATYCACAAQQRqQQBBJBD4ARoL3AQCAX8BfyMAQZABayICJAAgAkHgAGogARCdASACQTBqIAJB4ABqEJ0BIAJBMGogAkEwahCdASACQTBqIAEgAkEwahCeASACQeAAaiACQeAAaiACQTBqEJ4BIAJB4ABqIAJB4ABqEJ0BIAJB4ABqIAJBMGogAkHgAGoQngEgAkEwaiACQeAAahCdAUEBIQMDQCACQTBqIAJBMGoQnQEgA0EBaiIDQQVHDQALIAJB4ABqIAJBMGogAkHgAGoQngEgAkEwaiACQeAAahCdAUEBIQMDQCACQTBqIAJB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ARC4ASAAIAFB4AhqIAJBCBC3ARC4ASADIABBKGoQqwEgA0EoaiAAEKsBIANB0ABqIABB0ABqEKsBIANB+ABqIABB+ABqEKYBIAAgAyAEELgBIANBoAFqJAALCwAgAEGAAXFBB3YLIQAgABCiASAAQShqEKIBIABB0ABqEKIBIABB+ABqELABCxEAIAAgAXNB/wFxQX9qQR92CzwAIAAgASACEKUBIABBKGogAUEoaiACEKUBIABB0ABqIAFB0ABqIAIQpQEgAEH4AGogAUH4AGogAhClAQuyAwUBfwF/AX8BfwF/IwBB0ANrIgIkAANAIANBAXQiBSACQZADamogASADai0AACIGQQ9xOgAAIAJBkANqIAVBAXJqIAZBBHY6AAAgA0EBaiIDQSBHDQALQQAhAwNAIAJBkANqIARqIgUgBS0AACADaiIDIANBCGoiA0HwAXFrOgAAIANBGHRBHHUhAyAEQQFqIgRBP0cNAAsgAiACLQDPAyADajoAzwMgABCzAUEBIQMDQCACIANBAXYgAkGQA2ogA2osAAAQugEgAkHwAWogACACEK4BIAAgAkHwAWoQqQEgA0E+SSEEIANBAmohAyAEDQALIAJB8AFqIAAQrAEgAkH4AGogAkHwAWoQqAEgAkHwAWogAkH4AGoQrQEgAkH4AGogAkHwAWoQqAEgAkHwAWogAkH4AGoQrQEgAkH4AGogAkHwAWoQqAEgAkHwAWogAkH4AGoQrQEgACACQfABahCpAUEAIQMDQCACIANBAXYgAkGQA2ogA2osAAAQugEgAkHwAWogACACEK4BIAAgAkHwAWoQqQEgA0E+SSEEIANBAmohAyAEDQALIAJB0ANqJAALEwAgACABQcAHbEHgHmogAhC7AQv2AQIBfwF/IwBBgAFrIgMkACACELUBIQQgABDJASAAIAEgAkEAIARrIAJxQQF0a0EYdEEYdSICQQEQtwEQygEgACABQfgAaiACQQIQtwEQygEgACABQfABaiACQQMQtwEQygEgACABQegCaiACQQQQtwEQygEgACABQeADaiACQQUQtwEQygEgACABQdgEaiACQQYQtwEQygEgACABQdAFaiACQQcQtwEQygEgACABQcgGaiACQQgQtwEQygEgA0EIaiAAQShqEKsBIANBMGogABCrASADQdgAaiAAQdAAahCmASAAIANBCGogBBDKASADQYABaiQAC6keNgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfiABEJkBIRUgAUECahCYASEWIAFBBWoQmQEhFyABQQdqEJgBIRggAUEKahCYASEQIAFBDWoQmQEhESABQQ9qEJgBIQ0gAUESahCZASEJIAFBFWoQmQEhCCABQRdqEJgBIQogAUEaahCZASEDIAFBHGoQmAEhBiACEJkBIQ4gAkECahCYASEPIAJBBWoQmQEhCyACQQdqEJgBIQwgAkEKahCYASESIAJBDWoQmQEhEyACQQ9qEJgBIRQgAkESahCZASEZIAJBFWoQmQEhGiACQRdqEJgBIQcgAkEaahCZASEEIAAgAkEcahCYAUIHiCIFIANCAohC////AIMiA34gBEICiEL///8AgyIEIAZCB4giBn58IAMgBH4gB0IFiEL///8AgyIHIAZ+fCAFIApCBYhC////AIMiCn58IiFCgIBAfSIiQhWHfCIjICNCgIBAfSIcQoCAgH+DfSIjQpPYKH4gD0IFiEL///8AgyIPIAhC////AIMiCH4gDkL///8AgyIOIAp+fCALQgKIQv///wCDIgsgCUIDiEL///8AgyIJfnwgDEIHiEL///8AgyIMIA1CBohC////AIMiDX58IBJCBIhC////AIMiEiARQgGIQv///wCDIhF+fCATQgGIQv///wCDIhMgEEIEiEL///8AgyIQfnwgFEIGiEL///8AgyIUIBhCB4hC////AIMiGH58IBpC////AIMiGiAWQgWIQv///wCDIhZ+fCAZQgOIQv///wCDIhkgF0ICiEL///8AgyIXfnwgByAVQv///wCDIhV+fCAJIA9+IAggDn58IAsgDX58IAwgEX58IBAgEn58IBMgGH58IBQgF358IBYgGX58IBUgGn58Ih1CgIBAfSIeQhWHfCIffCAfQoCAQH0iG0KAgIB/g30gISAiQoCAgH+DfSADIAd+IAYgGn58IAQgCn58IAUgCH58IAYgGX4gAyAafnwgByAKfnwgBCAIfnwgBSAJfnwiH0KAgEB9IiBCFYd8IiRCgIBAfSIlQhWH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PAAQIAAgA0L///8AgyIGQgGGIARCFIiEPAANIAAgC0L///8AgyAFQhWHfCIDQg2IPAAUIAAgA0IFiDwAEyAAIAVC////AIMiBEIGhiAGQg+IhDwADyAAIAlC////AIMgA0IVh3wiBTwAFSAAIANCA4YgBEISiIQ8ABIgACAFQgiIPAAWIAAgDEL///8AgyAFQhWHfCIDQguIPAAZIAAgA0IDiDwAGCAAIA1C////AIMgA0IVh3wiBEIGiDwAGyAAIAVCEIhCH4MgA0L///8AgyIDQgWGhDwAFyAAIAhC////AIMgBEIVh3wiBUIRiDwAHyAAIAVCCYg8AB4gACAFQgGIPAAdIAAgBEL///8AgyIEQgKGIANCE4iEPAAaIAAgBUIHhiAEQg6IhDwAHAuGBQEBfyMAQeAFayICJAAgAkHABWogARC+ASACQeABaiABIAJBwAVqELwBIAJBoAVqIAEgAkHgAWoQvAEgAkGABWogAkGgBWoQvgEgAkGgA2ogAkHABWogAkGABWoQvAEgAkHAAmogASACQaADahC8ASACQeAEaiACQYAFahC+ASACQaACaiACQcACahC+ASACQcAEaiACQaADaiACQaACahC8ASACQcADaiACQeAEaiACQaACahC8ASACQaAEaiACQcAEahC+ASACQYADaiACQeAEaiACQaAEahC8ASACQeACaiACQeABaiACQYADahC8ASACQcABaiACQeAEaiACQeACahC8ASACQaABaiACQaAFaiACQcABahC8ASACQeAAaiACQaAFaiACQaABahC8ASACQYAEaiACQaAEaiACQeACahC8ASACQeADaiACQaAFaiACQYAEahC8ASACQYACaiACQcADaiACQeADahC8ASACQYABaiACQaACaiACQYACahC8ASACQUBrIAJBgANqIAJB4ANqELwBIAJBIGogAkGgBWogAkFAaxC8ASACIAJBoANqIAJBIGoQvAEgACACQcACaiACELwBIABB/gAgAkHgAmoQvwEgAEEJIAJBwAVqEL8BIAAgACACELwBIABBByACQaABahC/ASAAQQkgAhC/ASAAQQsgAkGAAmoQvwEgAEEIIAJBQGsQvwEgAEEJIAJB4ABqEL8BIABBBiACQcACahC/ASAAQQ4gAkGABGoQvwEgAEEKIAJBwAFqEL8BIABBCSACQeADahC/ASAAQQogAhC/ASAAQQggAkGAAWoQvwEgAEEIIAJBIGoQvwEgAkHgBWokAAsLACAAIAEgARC8AQsrAQF/IAFBAU4EQANAIAAgABC+ASADQQFqIgMgAUcNAAsLIAAgACACELwBC2EFAX8BfwF/AX8Bf0EgIQFBASECA0AgACABQX9qIgFqLQAAIgVBACIEQZAeaiABai0AACIEa0EIdSACcSADQf8BcXIhAyAEIAVzQf//A2pBCHYgAnEhAiABDQALIANBAEcLiQMDAX8BfwF/IwBB4ANrIgIkAAJ/QX8gARDCAUUNABogAkHQAmogARCXAUEAIQEgAkGgAmogAkHQAmoQnQEgAkHwAWoQogEgAkHwAWogAkHwAWogAkGgAmoQoQEgAkGQAWogAkHwAWoQnQEgAkHAAWoQogEgAkHAAWogAkHAAWogAkGgAmoQoAEgAkHgAGogAkHAAWoQnQEgAkEwaiABQYAdaiACQZABahCeASACQTBqIAJBMGoQpgEgAkEwaiACQTBqIAJB4ABqEKEBIAIgAkEwaiACQeAAahCeASACQYADahCiASACQbADaiACQYADaiACEMMBIQMgACACQbADaiACQcABahCeASAAQShqIgEgAkGwA2ogABCeASABIAEgAkEwahCeASAAIAAgAkHQAmoQngEgACAAIAAQoAEgACAAEMQBIAEgAkHwAWogARCeASAAQdAAahCiASAAQfgAaiIEIAAgARCeAUEAIAQQpwFBASADa3IgARCkAXJrCyEAIAJB4ANqJAAgAAtlBAF/AX8BfwF/IAAtAB8iA0F/c0H/AHEhAkEeIQEDQCACIAAgAWotAABBf3NyIQIgAUF/aiIEIQEgBA0ACyACQf8BcUF/akHsASAALQAAIgFrcUEIdiABIANBB3ZyckF/c0EBcQuRAgMBfwF/AX8jAEGgAmsiAyQAIANB8AFqIAIQnQEgA0HwAWogA0HwAWogAhCeASAAIANB8AFqEJ0BIAAgACACEJ4BIAAgACABEJ4BIAAgABCjASAAIAAgA0HwAWoQngEgACAAIAEQngEgA0HAAWogABCdASADQcABaiADQcABaiACEJ4BIANBkAFqIANBwAFqIAEQoQEgA0HgAGogA0HAAWogARCgASADQTBqIAFBsB0iAhCeASADQTBqIANBwAFqIANBMGoQoAEgA0GQAWoQpAEhBCADQeAAahCkASEBIANBMGoQpAEhBSADIAAgAhCeASAAIAMgASAFchClASAAIAAQxAEgA0GgAmokACABIARyCw4AIAAgASABEKcBEMUBCysBAX8jAEEwayIDJAAgAyABEKYBIAAgARCrASAAIAMgAhClASADQTBqJAALiQQGAX8BfwF/AX8BfwF/IwBB4AZrIgIkACACQdACaiABQdAAaiIFIAFBKGoiBBCgASACIAUgBBChASACQdACaiACQdACaiACEJ4BIAJBoAJqIAEgBBCeASACQfABaiACQaACahCdASACQfABaiACQdACaiACQfABahCeASACQeADahCiASACQfAEaiACQeADaiACQfABahDDARogAkGwBmogAkHwBGogAkHQAmoQngEgAkGABmogAkHwBGogAkGgAmoQngEgAkEwaiACQbAGaiACQYAGahCeASACQTBqIAJBMGogAUH4AGoiAxCeASACQcAEaiABQQBBsB1qIgcQngEgAkGQBGogBCAHEJ4BIAJBoAVqIAJBsAZqIAZBsB5qEJ4BIAJBgANqIAMgAkEwahCeASACQYADahCnASEDIAJBwAFqIAEQqwEgAkGQAWogBBCrASACQdAFaiACQYAGahCrASACQcABaiACQZAEaiADEKUBIAJBkAFqIAJBwARqIAMQpQEgAkHQBWogAkGgBWogAxClASACQeAAaiACQcABaiACQTBqEJ4BIAJBkAFqIAJBkAFqIAJB4ABqEKcBEMUBIAJBsANqIAUgAkGQAWoQoQEgAkGwA2ogAkHQBWogAkGwA2oQngEgAkGwA2ogAkGwA2oQxAEgACACQbADahCaASACQeAGaiQAC4MBAQF/IwBBgAdrIgIkACACQdAGaiABEJcBIAJBoAZqIAFBIGoQlwEgAkHAAmogAkHQBmoQyAEgAkGgAWogAkGgBmoQyAEgAkGABWogAkGgAWoQqgEgAkHgA2ogAkHAAmogAkGABWoQnwEgAiACQeADahCpASAAIAIQxgEgAkGAB2okAAvTBAMBfwF/AX8jAEGgBWsiAiQAIAJBkARqEKIBIAJB4ANqIAEQnQEgAkHgA2pBAEGwHWogAkHgA2oQngEgAkHwAWogAkHgA2ogAkGQBGoQoAEgAkHwAWogAkHwAWogA0HgjgJqEJ4BIAJB8ARqEKIBIAJB8ARqIAJB8ARqEKYBIAJBsANqIAJB4ANqIANBgB1qIgQQoAEgAkHAAWogAkHgA2ogBBCeASACQcABaiACQfAEaiACQcABahChASACQcABaiACQcABaiACQbADahCeASACQYADaiACQfABaiACQcABahDDASEEIAJB0AJqIAJBgANqIAEQngEgAkHQAmogAkHQAmoQxAEgAkHQAmogAkHQAmoQpgEgAkGAA2ogAkHQAmpBASAEayIBEKUBIAJB8ARqIAJB4ANqIAEQpQEgAkHABGogAkHgA2ogAkGQBGoQoQEgAkHABGogAkHABGogAkHwBGoQngEgAkHABGogAkHABGogA0GQjwJqEJ4BIAJBwARqIAJBwARqIAJBwAFqEKEBIAJBkAFqIAJBgANqIAJBgANqEKABIAJBkAFqIAJBkAFqIAJBwAFqEJ4BIAJB4ABqIAJBwARqIANBwI8CahCeASACQaACaiACQYADahCdASACQTBqIAJBkARqIAJBoAJqEKEBIAIgAkGQBGogAkGgAmoQoAEgACACQZABaiACEJ4BIABBKGogAkEwaiACQeAAahCeASAAQdAAaiACQeAAaiACEJ4BIABB+ABqIAJBkAFqIAJBMGoQngEgAkGgBWokAAsYACAAEKIBIABBKGoQogEgAEHQAGoQsAELKwAgACABIAIQpQEgAEEoaiABQShqIAIQpQEgAEHQAGogAUHQAGogAhClAQv+BAMBfwF/AX8jAEHQAmsiAyQAQX8hBCACEMwBRQRAQQAhBANAIAAgBGogASAEai0AADoAACAEQQFqIgRBIEcNAAsgACAALQAAQfgBcToAACAAQR9qIgQgBC0AAEE/cUHAAHI6AAAgA0GgAmogAhCXASADQfABahDNASADQcABahDOASADQZABaiADQaACahDPASADQeAAahDNAUH+ASECA0AgA0HwAWogA0GQAWogACACIgRBA3ZqLQAAIARBB3F2QQFxIgEgBXMiAhDQASADQcABaiADQeAAaiACENABIARBf2ohAiADQTBqIANBkAFqIANB4ABqENEBIAMgA0HwAWogA0HAAWoQ0QEgA0HwAWogA0HwAWogA0HAAWoQ0gEgA0HAAWogA0GQAWogA0HgAGoQ0gEgA0HgAGogA0EwaiADQfABahDTASADQcABaiADQcABaiADENMBIANBMGogAxDUASADIANB8AFqENQBIANBkAFqIANB4ABqIANBwAFqENIBIANBwAFqIANB4ABqIANBwAFqENEBIANB8AFqIAMgA0EwahDTASADIAMgA0EwahDRASADQcABaiADQcABahDUASADQeAAaiADENUBIANBkAFqIANBkAFqENQBIANBMGogA0EwaiADQeAAahDSASADQeAAaiADQaACaiADQcABahDTASADQcABaiADIANBMGoQ0wEgASEFIAQNAAsgA0HwAWogA0GQAWogARDQASADQcABaiADQeAAaiABENABIANBwAFqIANBwAFqEJwBIANB8AFqIANB8AFqIANBwAFqENMBIAAgA0HwAWoQmgFBACEECyADQdACaiQAIAQL6gEGAX8BfwF/AX8BfwF/IwBBEGsiA0EANgALIANBADYCCANAIAAgAmotAAAhBUEAIQEDQCADQQhqIAFqIgYgBi0AAEEAQfCPAmogAUEFdGogAmotAAAgBXNyOgAAIAFBAWoiAUEHRw0ACyACQQFqIgJBH0cNAAsgAC0AH0H/AHEhBUEAIQEDQCADQQhqIAFqIgIgAi0AACAFQQAiBiABQQV0akGPkAJqLQAAc3I6AAAgAUEBaiIBQQdHDQALQQAhAQNAIANBCGogBGotAABBf2ogAXIhASAEQQFqIgRBB0cNAAsgAUEIdkEBcQsWACAAQQE2AgAgAEEEakEAQSQQ+AEaCwwAIABBAEEoEPgBGgtMBAF+AX4BfgF+IAEpAgghAiABKQIQIQMgASkCGCEEIAEpAgAhBSAAIAEpAiA3AiAgACAENwIYIAAgAzcCECAAIAI3AgggACAFNwIAC88EJwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfyABQQRqIhUoAgAhCiAAQQRqIhYoAgAhCyABQQhqIhcoAgAhDCAAQQhqIhgoAgAhDSABQQxqIhkoAgAhDiAAQQxqIhooAgAhAyABQRBqIhsoAgAhDyAAQRBqIhwoAgAhBCABQRRqIh0oAgAhECAAQRRqIh4oAgAhBSABQRhqIh8oAgAhESAAQRhqIiAoAgAhBiABQRxqIiEoAgAhEiAAQRxqIiIoAgAhByABQSBqIiMoAgAhEyAAQSBqIiQoAgAhCCABQSRqIiUoAgAhFCAAQSRqIiYoAgAhCSAAQQAgAmsiAiABKAIAIicgACgCACIoc3EiKSAoczYCACAmIAkgCSAUcyACcSIAczYCACAkIAggCCATcyACcSIJczYCACAiIAcgByAScyACcSIIczYCACAgIAYgBiARcyACcSIHczYCACAeIAUgBSAQcyACcSIGczYCACAcIAQgBCAPcyACcSIFczYCACAaIAMgAyAOcyACcSIEczYCACAYIA0gDCANcyACcSIDczYCACAWIAsgCiALcyACcSICczYCACAlIAAgFHM2AgAgIyAJIBNzNgIAICEgCCASczYCACAfIAcgEXM2AgAgHSAGIBBzNgIAIBsgBSAPczYCACAZIAQgDnM2AgAgFyADIAxzNgIAIBUgAiAKczYCACABICcgKXM2AgALjgISAX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/IAIoAgQhAyABKAIEIQQgAigCCCEFIAEoAgghBiACKAIMIQcgASgCDCEIIAIoAhAhCSABKAIQIQogAigCFCELIAEoAhQhDCACKAIYIQ0gASgCGCEOIAIoAhwhDyABKAIcIRAgAigCICERIAEoAiAhEiACKAIkIRMgASgCJCEUIAAgASgCACACKAIAazYCACAAIBQgE2s2AiQgACASIBFrNgIgIAAgECAPazYCHCAAIA4gDWs2AhggACAMIAtrNgIUIAAgCiAJazYCECAAIAggB2s2AgwgACAGIAVrNgIIIAAgBCADazYCBAuOAhIBfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8BfwF/AX8gAigCBCEDIAEoAgQhBCACKAIIIQUgASgCCCEGIAIoAgwhByABKAIMIQggAigCECEJIAEoAhAhCiACKAIUIQsgASgCFCEMIAIoAhghDSABKAIYIQ4gAigCHCEPIAEoAhwhECACKAIgIREgASgCICESIAIoAiQhEyABKAIkIRQgACACKAIAIAEoAgBqNgIAIAAgEyAUajYCJCAAIBEgEmo2AiAgACAPIBBqNgIcIAAgDSAOajYCGCAAIAsgDGo2AhQgACAJIApqNgIQIAAgByAIajYCDCAAIAUgBmo2AgggACADIARqNgIEC/8JMwF+AX4BfgF+AX4BfgF+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b2Ygd2luZG93Xy5jcnlwdG8gIT09ICd1bmRlZmluZWQnID8gd2luZG93Xy5jcnlwdG8gOiB3aW5kb3dfLm1zQ3J5cHRvOyB2YXIgcmFuZG9tVmFsdWVzU3RhbmRhcmQgPSBmdW5jdGlvbigpIHsgdmFyIGJ1ZiA9IG5ldyBVaW50MzJBcnJheSgxKTsgY3J5cHRvXy5nZXRSYW5kb21WYWx1ZXMoYnVmKTsgcmV0dXJuIGJ1ZlswXSA+Pj4gMDsgfTsgcmFuZG9tVmFsdWVzU3RhbmRhcmQoKTsgTW9kdWxlLmdldFJhbmRvbVZhbHVlID0gcmFuZG9tVmFsdWVzU3RhbmRhcmQ7IH0gY2F0Y2ggKGUpIHsgdHJ5IHsgdmFyIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpOyB2YXIgcmFuZG9tVmFsdWVOb2RlSlMgPSBmdW5jdGlvbigpIHsgdmFyIGJ1ZiA9IGNyeXB0b1sncmFuZG9tQnl0ZXMnXSg0KTsgcmV0dXJuIChidWZbMF0gPDwgMjQgfCBidWZbMV0gPDwgMTYgfCBidWZbMl0gPDwgOCB8IGJ1ZlszXSkgPj4+IDA7IH07IHJhbmRvbVZhbHVlTm9kZUpTKCk7IE1vZHVsZS5nZXRSYW5kb21WYWx1ZSA9IHJhbmRvbVZhbHVlTm9kZUpTOyB9IGNhdGNoIChlKSB7IHRocm93ICdObyBzZWN1cmUgcmFuZG9tIG51bWJlciBnZW5lcmF0b3IgZm91bmQnOyB9IH0gfSB9AEF1dGhLZXkAJG09AGJ1Zl9sZW4gPD0gU0laRV9NQVgARXhwb3J0S2V5ACx0PQByYW5kb21ieXRlcy9yYW5kb21ieXRlcy5jAHNlc3Npb24gc2VjcmV0ACxwPQBoYW5kc2hha2Ugc2VjcmV0AHNlcnZlciBtYWMAJGFyZ29uMmlkJHY9AGNsaWVudCBtYWMAJGFyZ29uMmkkdj0Ac2VydmVyIGVuYwBPUEFRVUUgAEHAEgsUVk9QUkYwNi1GaW5hbGl6ZS0AAAEAQeASC6EHZ+YJaoWuZ7ty8248OvVPpX9SDlGMaAWbq9mDHxnN4FuYL4pCkUQ3cc/7wLWl27XpW8JWOfER8Vmkgj+S1V4cq5iqB9gBW4MSvoUxJMN9DFV0Xb5y/rHegKcG3Jt08ZvBwWmb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AHmL0/538CMAQb3Z/ruzov+gu+YAPvgO/zxOYQD/96P/4Ttb/2tHOv/xLyEBMnXsANuxP/70WrMAI8LX/71DMv8Xh4EAaL0l/7k5wgAjPuf/3PhsAAznsgCPUFsBg11l/5AnAgH/+rIABRHs/osgLgDMvCb+9XM0/79xSf6/bEX/FkX1ARfLsgCqY6oAQfhvACVsmf9AJUUAAFg+/lmUkP+/ROAB8Sc1ACnL7f+RfsL/3Sr9/xljlwBh/d8BSnMx/wavSP87sMsAfLf5AeTkYwCBDM/+qMDD/8ywEP6Y6qsATSVV/yF4h/+OwuMBH9Y6ANW7ff/oLjz/vnQq/peyE/8zPu3+zOzBAMLoPACsIp3/vRC4/mcDX/+N6ST+KRkL/xXDpgB29S0AQ9WV/58MEv+7pOMBoBkFAAxOwwErxeEAMI4p/sSbPP/fxxIBkYicAPx1qf6R4u4A7xdrAG21vP/mcDH+Sart/+e34/9Q3BQAwmt/AX/NZQAuNMUB0qsk/1gDWv84l40AYLv//ypOyAD+RkYB9H2oAMxEigF810YAZkLI/hE05AB13I/+y/h7ADgSrv+6l6T/M+jQAaDkK//5HRkBRL4/AHbBXwBlcAL/UPyh/vJqxv+FBrIA5N9wAN/uVf4z8xoAPiuL/stBCgBBkI8CC1czTe0AkapW/zYmM//xgGX/KXlK/+xOmwCpl2n+nClIAMJmr//OomX/AAAAAAAAAAAbLnsBEqj9/9Ovl/7D22AAOHa+/v7R9f+ZZH7+6IEV/zW48v/HpN0AQZCQAgsBAQBBsJACC70B4Ot6fDtBuK4WVuP68Z/EatoJjeucMrH9hmIFFl9JuABfnJW8o1CMJLHQsVWcg+9bBERcxFgcjobYIk7d0J8RV+z///////////////////////////////////////9/7f///////////////////////////////////////3/u////////////////////////////////////////f3JhbmRvbWJ5dGVzAHNvZGl1bV9iaW4yYmFzZTY0AEHwkQILBQEAAAACAMspBG5hbWUBwymAAgANX19hc3NlcnRfZmFpbAEFYWJvcnQCFmVtc2NyaXB0ZW5fcmVzaXplX2hlYXADFWVtc2NyaXB0ZW5fbWVtY3B5X2JpZwQYZW1zY3JpcHRlbl9hc21fY29uc3RfaWlpBRdlbXNjcmlwdGVuX2dldF9zYnJrX3B0cgYRX193YXNtX2NhbGxfY3RvcnMHJW9wYXF1ZWpzX2NyeXB0b19hdXRoX2htYWNzaGEyNTZfQllURVMIJ29wYXF1ZWpzX2NyeXB0b19jb3JlX3Jpc3RyZXR0bzI1NV9CWVRFUwkhb3BhcXVlanNfY3J5cHRvX2hhc2hfc2hhMjU2X0JZVEVTCiBvcGFxdWVqc19jcnlwdG9fc2NhbGFybXVsdF9CWVRFUwsmb3BhcXVlanNfY3J5cHRvX3NjYWxhcm11bHRfU0NBTEFSQllURVMMIm9wYXF1ZWpzX2NyeXB0b19zZWNyZXRib3hfS0VZQllURVMNH29wYXF1ZWpzX09QQVFVRV9VU0VSX1JFQ09SRF9MRU4OI29wYXF1ZWpzX09QQVFVRV9SRUdJU1RFUl9QVUJMSUNfTEVODyNvcGFxdWVqc19PUEFRVUVfUkVHSVNURVJfU0VDUkVUX0xFThAib3BhcXVlanNfT1BBUVVFX1NFUlZFUl9TRVNTSU9OX0xFThElb3BhcXVlanNfT1BBUVVFX1JFR0lTVEVSX1VTRVJfU0VDX0xFThInb3BhcXVlanNfT1BBUVVFX1VTRVJfU0VTU0lPTl9QVUJMSUNfTEVOEydvcGFxdWVqc19PUEFRVUVfVVNFUl9TRVNTSU9OX1NFQ1JFVF9MRU4UI29wYXF1ZWpzX09QQVFVRV9TRVJWRVJfQVVUSF9DVFhfTEVOFRlvcGFxdWVqc19HZW5TZXJ2ZXJLZXlQYWlyFhFvcGFxdWVqc19SZWdpc3Rlchcgb3BhcXVlanNfQ3JlYXRlQ3JlZGVudGlhbFJlcXVlc3QYIW9wYXF1ZWpzX0NyZWF0ZUNyZWRlbnRpYWxSZXNwb25zZRkbb3BhcXVlanNfUmVjb3ZlckNyZWRlbnRpYWxzGhFvcGFxdWVqc19Vc2VyQXV0aBsib3BhcXVlanNfQ3JlYXRlUmVnaXN0cmF0aW9uUmVxdWVzdBwjb3BhcXVlanNfQ3JlYXRlUmVnaXN0cmF0aW9uUmVzcG9uc2UdJW9wYXF1ZWpzX0NyZWF0ZTFrUmVnaXN0cmF0aW9uUmVzcG9uc2UeGG9wYXF1ZWpzX0ZpbmFsaXplUmVxdWVzdB8Yb3BhcXVlanNfU3RvcmVVc2VyUmVjb3JkIBpvcGFxdWVqc19TdG9yZTFrVXNlclJlY29yZCEVb3BhcXVlanNfZW52ZWxvcGVfbGVuIitvcGFxdWVqc19zZXJ2ZXJfcHVibGljX2tleV9mcm9tX3VzZXJfcmVjb3JkIwxvcGFxdWVfbWxvY2skDm9wYXF1ZV9tdW5sb2NrJRNvcGFxdWVfZW52ZWxvcGVfbGVuJg9vcGFxdWVfUmVnaXN0ZXInEmV4cGFuZF9tZXNzYWdlX3htZCgNb3ByZl9GaW5hbGl6ZSkEcGFjayoPb3BhcXVlX2VudmVsb3BlKx5vcGFxdWVfQ3JlYXRlQ3JlZGVudGlhbFJlcXVlc3QsCm9wcmZfQmxpbmQtH29wYXF1ZV9DcmVhdGVDcmVkZW50aWFsUmVzcG9uc2UuCWNhbGNfaW5mby8LZGVyaXZlX2tleXMwCmdldF94Y3JpcHQxGW9wYXF1ZV9SZWNvdmVyQ3JlZGVudGlhbHMyDG9wcmZfVW5ibGluZDMUb3BhcXVlX2VudmVsb3BlX29wZW40EmV4dHJhY3RfY3JlZGVudGlhbDUPb3BhcXVlX1VzZXJBdXRoNiBvcGFxdWVfQ3JlYXRlUmVnaXN0cmF0aW9uUmVxdWVzdDchb3BhcXVlX0NyZWF0ZVJlZ2lzdHJhdGlvblJlc3BvbnNlOCNvcGFxdWVfQ3JlYXRlMWtSZWdpc3RyYXRpb25SZXNwb25zZTkWb3BhcXVlX0ZpbmFsaXplUmVxdWVzdDoWb3BhcXVlX1N0b3JlVXNlclJlY29yZDsYb3BhcXVlX1N0b3JlMWtVc2VyUmVjb3JkPBFoa2RmX2V4cGFuZF9sYWJlbD0eY3J5cHRvX2tkZl9oa2RmX3NoYTI1Nl9leHRyYWN0Ph1jcnlwdG9fa2RmX2hrZGZfc2hhMjU2X2V4cGFuZD8bY3J5cHRvX2F1dGhfaG1hY3NoYTI1Nl9pbml0QB1jcnlwdG9fYXV0aF9obWFjc2hhMjU2X3VwZGF0ZUEcY3J5cHRvX2F1dGhfaG1hY3NoYTI1Nl9maW5hbEIWY3J5cHRvX2F1dGhfaG1hY3NoYTI1NkMdY3J5cHRvX2F1dGhfaG1hY3NoYTI1Nl92ZXJpZnlEF2NyeXB0b19oYXNoX3NoYTI1Nl9pbml0RRljcnlwdG9faGFzaF9zaGEyNTZfdXBkYXRlRhBTSEEyNTZfVHJhbnNmb3JtRwxiZTMyZGVjX3ZlY3RIBnJvdHIzMkkYY3J5cHRvX2hhc2hfc2hhMjU2X2ZpbmFsSgpTSEEyNTZfUGFkSwxiZTMyZW5jX3ZlY3RMCnN0b3JlNjRfYmVNCnN0b3JlMzJfYmVOCWxvYWQzMl9iZU8XY3J5cHRvX2hhc2hfc2hhNTEyX2luaXRQGWNyeXB0b19oYXNoX3NoYTUxMl91cGRhdGVREFNIQTUxMl9UcmFuc2Zvcm1SDGJlNjRkZWNfdmVjdFMGcm90cjY0VBhjcnlwdG9faGFzaF9zaGE1MTJfZmluYWxVClNIQTUxMl9QYWRWDGJlNjRlbmNfdmVjdFcMc3RvcmU2NF9iZS4xWBJjcnlwdG9faGFzaF9zaGE1MTJZCWxvYWQ2NF9iZVoUYmxha2UyYl9jb21wcmVzc19yZWZbCWxvYWQ2NF9sZVwIcm90cjY0LjFdEmJsYWtlMmJfaW5pdF9wYXJhbV4NYmxha2UyYl9pbml0MF8LbG9hZDY0X2xlLjFgDGJsYWtlMmJfaW5pdGEKc3RvcmUzMl9sZWIKc3RvcmU2NF9sZWMQYmxha2UyYl9pbml0X2tleWQOYmxha2UyYl91cGRhdGVlGWJsYWtlMmJfaW5jcmVtZW50X2NvdW50ZXJmDWJsYWtlMmJfZmluYWxnFGJsYWtlMmJfaXNfbGFzdGJsb2NraBVibGFrZTJiX3NldF9sYXN0YmxvY2tpFGJsYWtlMmJfc2V0X2xhc3Rub2RlagdibGFrZTJiaxpjcnlwdG9fZ2VuZXJpY2hhc2hfYmxha2UyYmwfY3J5cHRvX2dlbmVyaWNoYXNoX2JsYWtlMmJfaW5pdG0hY3J5cHRvX2dlbmVyaWNoYXNoX2JsYWtlMmJfdXBkYXRlbiBjcnlwdG9fZ2VuZXJpY2hhc2hfYmxha2UyYl9maW5hbG8MYmxha2UyYl9sb25ncAxzdG9yZTMyX2xlLjFxF2FyZ29uMl9maWxsX3NlZ21lbnRfcmVmchJnZW5lcmF0ZV9hZGRyZXNzZXNzC2luZGV4X2FscGhhdBNmaWxsX2Jsb2NrX3dpdGhfeG9ydQpmaWxsX2Jsb2NrdhBpbml0X2Jsb2NrX3ZhbHVldwpjb3B5X2Jsb2NreAl4b3JfYmxvY2t5B2ZCbGFNa2F6CHJvdHI2NC4yew9hcmdvbjJfZmluYWxpemV8DGNvcHlfYmxvY2suMX0LeG9yX2Jsb2NrLjF+C3N0b3JlX2Jsb2NrfxRhcmdvbjJfZnJlZV9pbnN0YW5jZYABDHN0b3JlNjRfbGUuMYEBDGNsZWFyX21lbW9yeYIBC2ZyZWVfbWVtb3J5gwEZYXJnb24yX2ZpbGxfbWVtb3J5X2Jsb2Nrc4QBFmFyZ29uMl92YWxpZGF0ZV9pbnB1dHOFARFhcmdvbjJfaW5pdGlhbGl6ZYYBD2FsbG9jYXRlX21lbW9yeYcBE2FyZ29uMl9pbml0aWFsX2hhc2iIARhhcmdvbjJfZmlsbF9maXJzdF9ibG9ja3OJAQxzdG9yZTMyX2xlLjKKAQpsb2FkX2Jsb2NriwELbG9hZDY0X2xlLjKMARRhcmdvbjJfZW5jb2RlX3N0cmluZ40BDXUzMl90b19zdHJpbmeOAQphcmdvbjJfY3R4jwELYXJnb24yX2hhc2iQARBhcmdvbjJpX2hhc2hfcmF3kQERYXJnb24yaWRfaGFzaF9yYXeSARVjcnlwdG9fcHdoYXNoX2FyZ29uMmmTARZjcnlwdG9fcHdoYXNoX2FyZ29uMmlklAENY3J5cHRvX3B3aGFzaJUBFmNyeXB0b19zY2FsYXJtdWx0X2Jhc2WWARFjcnlwdG9fc2NhbGFybXVsdJcBEWZlMjU1MTlfZnJvbWJ5dGVzmAEGbG9hZF80mQEGbG9hZF8zmgEPZmUyNTUxOV90b2J5dGVzmwEOZmUyNTUxOV9yZWR1Y2WcAQ5mZTI1NTE5X2ludmVydJ0BCmZlMjU1MTlfc3GeAQtmZTI1NTE5X211bJ8BC2dlMjU1MTlfYWRkoAELZmUyNTUxOV9hZGShAQtmZTI1NTE5X3N1YqIBCWZlMjU1MTlfMaMBEGZlMjU1MTlfcG93MjI1MjOkAQ5mZTI1NTE5X2lzemVyb6UBDGZlMjU1MTlfY21vdqYBC2ZlMjU1MTlfbmVnpwESZmUyNTUxOV9pc25lZ2F0aXZlqAESZ2UyNTUxOV9wMXAxX3RvX3AyqQESZ2UyNTUxOV9wMXAxX3RvX3AzqgEUZ2UyNTUxOV9wM190b19jYWNoZWSrAQxmZTI1NTE5X2NvcHmsAQ5nZTI1NTE5X3AzX2RibK0BDmdlMjU1MTlfcDJfZGJsrgEMZ2UyNTUxOV9tYWRkrwEQZ2UyNTUxOV9wM190b19wMrABCWZlMjU1MTlfMLEBC2ZlMjU1MTlfc3EysgESZ2UyNTUxOV9zY2FsYXJtdWx0swEMZ2UyNTUxOV9wM18wtAEUZ2UyNTUxOV9jbW92OF9jYWNoZWS1AQhuZWdhdGl2ZbYBEGdlMjU1MTlfY2FjaGVkXzC3AQVlcXVhbLgBE2dlMjU1MTlfY21vdl9jYWNoZWS5ARdnZTI1NTE5X3NjYWxhcm11bHRfYmFzZboBEmdlMjU1MTlfY21vdjhfYmFzZbsBDWdlMjU1MTlfY21vdji8AQtzYzI1NTE5X211bL0BDnNjMjU1MTlfaW52ZXJ0vgEKc2MyNTUxOV9zcb8BDXNjMjU1MTlfc3FtdWzAARRzYzI1NTE5X2lzX2Nhbm9uaWNhbMEBFnJpc3RyZXR0bzI1NV9mcm9tYnl0ZXPCARlyaXN0cmV0dG8yNTVfaXNfY2Fub25pY2FswwEacmlzdHJldHRvMjU1X3NxcnRfcmF0aW9fbTHEAQtmZTI1NTE5X2Fic8UBDGZlMjU1MTlfY25lZ8YBF3Jpc3RyZXR0bzI1NV9wM190b2J5dGVzxwEWcmlzdHJldHRvMjU1X2Zyb21faGFzaMgBFnJpc3RyZXR0bzI1NV9lbGxpZ2F0b3LJARFnZTI1NTE5X3ByZWNvbXBfMMoBDGdlMjU1MTlfY21vdssBImNyeXB0b19zY2FsYXJtdWx0X2N1cnZlMjU1MTlfcmVmMTDMAQ9oYXNfc21hbGxfb3JkZXLNAQtmZTI1NTE5XzEuMc4BC2ZlMjU1MTlfMC4xzwEOZmUyNTUxOV9jb3B5LjHQAQ1mZTI1NTE5X2Nzd2Fw0QENZmUyNTUxOV9zdWIuMdIBDWZlMjU1MTlfYWRkLjHTAQ1mZTI1NTE5X211bC4x1AEMZmUyNTUxOV9zcS4x1QENZmUyNTUxOV9tdWwzMtYBJ2NyeXB0b19zY2FsYXJtdWx0X2N1cnZlMjU1MTlfcmVmMTBfYmFzZdcBFWVkd2FyZHNfdG9fbW9udGdvbWVyedgBHGNyeXB0b19zY2FsYXJtdWx0X2N1cnZlMjU1MTnZASFjcnlwdG9fc2NhbGFybXVsdF9jdXJ2ZTI1NTE5X2Jhc2XaAQ9jcnlwdG9fdmVyaWZ5X27bARBjcnlwdG9fdmVyaWZ5XzMy3AEScmFuZG9tYnl0ZXNfcmFuZG9t3QEPcmFuZG9tYnl0ZXNfYnVm3gELcmFuZG9tYnl0ZXPfARtzb2RpdW1fYmFzZTY0X2NoZWNrX3ZhcmlhbnTgARFzb2RpdW1fYmluMmJhc2U2NOEBGGI2NF9ieXRlX3RvX3VybHNhZmVfY2hhcuIBEGI2NF9ieXRlX3RvX2NoYXLjAQ1zb2RpdW1fbWlzdXNl5AEOc29kaXVtX21lbXplcm/lAQ1zb2RpdW1fbWVtY21w5gEOc29kaXVtX2lzX3plcm/nASFjcnlwdG9fY29yZV9lZDI1NTE5X3NjYWxhcl9yYW5kb23oASFjcnlwdG9fY29yZV9lZDI1NTE5X3NjYWxhcl9pbnZlcnTpASdjcnlwdG9fY29yZV9yaXN0cmV0dG8yNTVfaXNfdmFsaWRfcG9pbnTqASJjcnlwdG9fY29yZV9yaXN0cmV0dG8yNTVfZnJvbV9oYXNo6wEmY3J5cHRvX2NvcmVfcmlzdHJldHRvMjU1X3NjYWxhcl9yYW5kb23sASZjcnlwdG9fY29yZV9yaXN0cmV0dG8yNTVfc2NhbGFyX2ludmVydO0BHmNyeXB0b19zY2FsYXJtdWx0X3Jpc3RyZXR0bzI1Ne4BBWh0b25z7wEKX19ic3dhcF8xNvABEF9fZXJybm9fbG9jYXRpb27xAQhkbG1hbGxvY/IBBmRsZnJlZfMBEWludGVybmFsX21lbWFsaWdu9AEQZGxwb3NpeF9tZW1hbGlnbvUBDWRpc3Bvc2VfY2h1bmv2AQRzYnJr9wEGbWVtY3B5+AEGbWVtc2V0+QEGc3RybGVu+gEJc3RhY2tTYXZl+wEMc3RhY2tSZXN0b3Jl/AEKc3RhY2tBbGxvY/0BEF9fZ3Jvd1dhc21NZW1vcnn+AQxkeW5DYWxsX2lpaWn/AQtkeW5DYWxsX2lpaQDybwsuZGVidWdfaW5mb5QPAAAEAAAAAAAEAQAAAAAMAJUAAAAAAAAAqAAAAAAAAAB4AAAAAkEAAAABAVoDvgAAAAADygAAAAED0wAAAAIABLAAAAAIAQVNAAAABkEAAADcAAAAArUFXQAAAAZoAAAAKwEAAAMNB4QDBgjkAAAAtQAAAAMHAAj7AAAAtQAAAAMIIAj/AAAAtQAAAAMJQAgDAQAAtQAA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AjokAAADAQEABQJHJAAAAwEFEQEABQJMJAAABQkGAQAFAlckAAADAQYBAAUCYiQAAAMCBQUBAAUCciQAAANhBQkBAAUCdyQAAAUPBgEABQJ/JAAAAyIFAQYBAAUCiiQAAAABAQC0JgouZGVidWdfc3RyY2xhbmcgdmVyc2lvbiAxMi4wLjAgKC9iL3Mvdy9pci9jYWNoZS9naXQvY2hyb21pdW0uZ29vZ2xlc291cmNlLmNvbS1leHRlcm5hbC1naXRodWIuY29tLWxsdm0tbGx2bS0tcHJvamVjdCA5ZjIxOTQ3YTMzMTIwM2VlMjU3OWRiODdmMWQxZWMyMmE5NDllMjBhKQB3cmFwcGVyL29wYXF1ZWpzLmMAL3NyYy9qcwB1bnNpZ25lZCBjaGFyAE5vdFBhY2thZ2VkAEluU2VjRW52AEluQ2xyRW52AHVpbnQ4X3QAa1UAX19BUlJBWV9TSVpFX1RZUEVfXwBza1MAcGtVAHBrUwBlbnZVX2xlbgB1bnNpZ25lZCBpbnQAdWludDMyX3QAZW52VQBPcGFxdWVfVXNlclJlY29yZABvcGFxdWVqc190b19Qa2dUYXJnZXQAaW50AGkAdGFyZ2V0AE9wYXF1ZV9Qa2dUYXJnZXQAcmFuZG9tYnl0ZXMAbG9uZyBsb25nIHVuc2lnbmVkIGludABvcGFxdWVqc190b19Qa2dDb25maWcAY2ZnX3NrVQBjZmdfcGtVAGNmZ19wa1MAY2ZnX2lkUwBjZmdfaWRVAGNmZwBza1UAaWRVAGlkUwBPcGFxdWVfUGtnQ29uZmlnAG9wYXF1ZWpzX3RvX0FwcF9JbmZvcwBhcHBfaW5mbwBhcHBfaW5mb19sZW4AbG9uZyB1bnNpZ25lZCBpbnQAc2l6ZV90AGFwcF9laW5mbwBhcHBfZWluZm9fbGVuAGluZm9zX3B0cgBpbmZvAGluZm9fbGVuAGVpbmZvAGVpbmZvX2xlbgBPcGFxdWVfQXBwX0luZm9zAGluZm9zAG9wYXF1ZV9TdG9yZVVzZXJSZWNvcmQAb3BhcXVlX1N0b3JlMWtVc2VyUmVjb3JkAG9wYXF1ZWpzX2NyeXB0b19hdXRoX2htYWNzaGEyNTZfQllURVMAb3BhcXVlanNfY3J5cHRvX2NvcmVfcmlzdHJldHRvMjU1X0JZVEVTAG9wYXF1ZWpzX2NyeXB0b19oYXNoX3NoYTI1Nl9CWVRFUwBvcGFxdWVqc19jcnlwdG9fc2NhbGFybXVsdF9CWVRFUwBvcGFxdWVqc19jcnlwdG9fc2NhbGFybXVsdF9TQ0FMQVJCWVRFUwBvcGFxdWVqc19jcnlwdG9fc2VjcmV0Ym94X0tFWUJZVEVTAG9wYXF1ZWpzX09QQVFVRV9VU0VSX1JFQ09SRF9MRU4Ab3BhcXVlanNfT1BBUVVFX1JFR0lTVEVSX1BVQkxJQ19MRU4Ab3BhcXVlanNfT1BBUVVFX1JFR0lTVEVSX1NFQ1JFVF9MRU4Ab3BhcXVlanNfT1BBUVVFX1NFUlZFUl9TRVNTSU9OX0xFTgBvcGFxdWVqc19PUEFRVUVfUkVHSVNURVJfVVNFUl9TRUNfTEVOAG9wYXF1ZWpzX09QQVFVRV9VU0VSX1NFU1NJT05fUFVCTElDX0xFTgBvcGFxdWVqc19PUEFRVUVfVVNFUl9TRVNTSU9OX1NFQ1JFVF9MRU4Ab3BhcXVlanNfT1BBUVVFX1NFUlZFUl9BVVRIX0NUWF9MRU4Ab3BhcXVlanNfR2VuU2VydmVyS2V5UGFpcgBvcGFxdWVqc19SZWdpc3RlcgBvcGFxdWVqc19DcmVhdGVDcmVkZW50aWFsUmVxdWVzdABvcGFxdWVqc19DcmVhdGVDcmVkZW50aWFsUmVzcG9uc2UAb3BhcXVlanNfUmVjb3ZlckNyZWRlbnRpYWxzAG9wYXF1ZWpzX1VzZXJBdXRoAG9wYXF1ZWpzX0NyZWF0ZVJlZ2lzdHJhdGlvblJlcXVlc3QAb3BhcXVlanNfQ3JlYXRlUmVnaXN0cmF0aW9uUmVzcG9uc2UAb3BhcXVlanNfQ3JlYXRlMWtSZWdpc3RyYXRpb25SZXNwb25zZQBvcGFxdWVqc19GaW5hbGl6ZVJlcXVlc3QAb3BhcXVlanNfU3RvcmVVc2VyUmVjb3JkAG9wYXF1ZWpzX1N0b3JlMWtVc2VyUmVjb3JkAG9wYXF1ZWpzX2VudmVsb3BlX2xlbgBvcGFxdWVqc19zZXJ2ZXJfcHVibGljX2tleV9mcm9tX3VzZXJfcmVjb3JkAGlkcwBpZFVfbGVuAHVuc2lnbmVkIHNob3J0AHVpbnQxNl90AGlkU19sZW4AT3BhcXVlX0lkcwBleHBvcnRfa2V5AHJlYwBpZHNfaWRTX2xlbgBpZHNfaWRTAGlkc19pZFVfbGVuAGlkc19pZFUAcHdkVV9sZW4AcHdkVQBwdWIAc2VjAHNrAHJlc3AAaWRzMQBhdXRoVQBNAF9yZWMAY2xhbmcgdmVyc2lvbiAxMi4wLjAgKC9iL3Mvdy9pci9jYWNoZS9naXQvY2hyb21pdW0uZ29vZ2xlc291cmNlLmNvbS1leHRlcm5hbC1naXRodWIuY29tLWxsdm0tbGx2bS0tcHJvamVjdCA5ZjIxOTQ3YTMzMTIwM2VlMjU3OWRiODdmMWQxZWMyMmE5NDllMjBhKQBjb21tb24uYwAvc3JjL3NyYwBzb2RpdW1fbWVtemVybwBsb25nIHVuc2lnbmVkIGludABvcGFxdWVfbWxvY2sAaW50AG9wYXF1ZV9tdW5sb2NrAGFkZHIAbGVuAHNpemVfdABjbGFuZyB2ZXJzaW9uIDEyLjAuMCAoL2Ivcy93L2lyL2NhY2hlL2dpdC9jaHJvbWl1bS5nb29nbGVzb3VyY2UuY29tLWV4dGVybmFsLWdpdGh1Yi5jb20tbGx2bS1sbHZtLS1wcm9qZWN0IDlmMjE5NDdhMzMxMjAzZWUyNTc5ZGI4N2YxZDFlYzIyYTk0OWUyMGEpAG9wYXF1ZS5jAC9zcmMvc3JjAE9QQVFVRV9GSU5BTElaRV9JTkZPAHVuc2lnbmVkIGNoYXIAdWludDhfdABfX0FSUkFZX1NJWkVfVFlQRV9fAE5vdFBhY2thZ2VkAEluU2VjRW52AEluQ2xyRW52AHNrVQBwa1UAcGtTAGlkVQBpZFMAa1UAc2tTAGVudlVfbGVuAHVuc2lnbmVkIGludAB1aW50MzJfdABlbnZVAE9wYXF1ZV9Vc2VyUmVjb3JkAGJsaW5kAHhfdQBub25jZVUATQBwd2RVX2xlbgB1bnNpZ25lZCBzaG9ydAB1aW50MTZfdABwd2RVAE9wYXF1ZV9Vc2VyU2Vzc2lvbl9TZWNyZXQAWF91AE9wYXF1ZV9Vc2VyU2Vzc2lvbgBrbTMAeGNyaXB0X3N0YXRlAHN0YXRlAGNvdW50AGxvbmcgbG9uZyB1bnNpZ25lZCBpbnQAdWludDY0X3QAYnVmAGNyeXB0b19oYXNoX3NoYTI1Nl9zdGF0ZQBPcGFxdWVfU2VydmVyQXV0aENUWABaAFhfcwBub25jZVMAYXV0aABPcGFxdWVfU2VydmVyU2Vzc2lvbgBPcGFxdWVfUmVnaXN0ZXJVc2VyU2VjAE9wYXF1ZV9SZWdpc3RlclNydlNlYwBPcGFxdWVfUmVnaXN0ZXJTcnZQdWIAdHlwZQBDcmVkZW50aWFsVHlwZQBzaXplAGRhdGEAQ3JlZGVudGlhbEV4dGVuc2lvbgBsb25nIHVuc2lnbmVkIGludAB1aW50cHRyX3QAY2hhcgBvcGFxdWVfcGFja2FnZV9sZW4Ac2l6ZV90AGNmZwBPcGFxdWVfUGtnVGFyZ2V0AE9wYXF1ZV9Qa2dDb25maWcAaWRzAGlkVV9sZW4AaWRTX2xlbgBPcGFxdWVfSWRzAHJlcwBvcHJmX0tleUdlbgBwcmYAaW50AG5vbmNlAHJ3ZFUASDAATgB2b3ByZl9oYXNoX3RvX3Jpc3RyZXR0bzI1NQBtc2cAbXNnX2xlbgBwAGRzdAB1bmlmb3JtX2J5dGVzAGRzdF9sZW4AY3J5cHRvX2NvcmVfcmlzdHJldHRvMjU1X3NjYWxhcl9yYW5kb20AcmFuZG9tYnl0ZXMAZXh0ZW5kX3BhY2thZ2UAc3JjAHNyY19sZW4AcHR5cGUAU2VjRW52AENsckVudgB0YXJnZXRfcHRyAHRhcmdldABvcHJmX0V2YWx1YXRlAGsAc2VydmVyXzNkaABrZXlzAHNrAGttMgBrZTIAT3BhcXVlX0tleXMAaXgAZXgASXAARXAAaW5mbwBzZWMAcHRyAGdldF94Y3JpcHRfc3J2AHhjcmlwdABfc2VjAHB1YgByZXNwAGluZm9zAGluZm9fbGVuAGVpbmZvAGVpbmZvX2xlbgBPcGFxdWVfQXBwX0luZm9zAHVucGFjawBTZWNFbnZfbGVuAENsckVudl9sZW4AY3JlZHMAT3BhcXVlX0NyZWRlbnRpYWxzAHNlZW4AY3JlZAB1c2VyXzNkaABnZXRfeGNyaXB0X3VzcgBlbnYAb3BhcXVlX0NyZWF0ZTFrUmVnaXN0cmF0aW9uUmVzcG9uc2UAX3B1YgBvcGFxdWVfU3RvcmUxa1VzZXJSZWNvcmQAX3JlYwByZWMAb3BhcXVlX2VudmVsb3BlX2xlbgBvcGFxdWVfUmVnaXN0ZXIAcGFjawBvcGFxdWVfZW52ZWxvcGUAb3BhcXVlX0NyZWF0ZUNyZWRlbnRpYWxSZXF1ZXN0AG9wcmZfQmxpbmQAb3BhcXVlX0NyZWF0ZUNyZWRlbnRpYWxSZXNwb25zZQBjYWxjX2luZm8Ab3BhcXVlX1JlY292ZXJDcmVkZW50aWFscwBvcHJmX1VuYmxpbmQAb3ByZl9GaW5hbGl6ZQBvcGFxdWVfZW52ZWxvcGVfb3BlbgBvcGFxdWVfVXNlckF1dGgAb3BhcXVlX0NyZWF0ZVJlZ2lzdHJhdGlvblJlcXVlc3QAb3BhcXVlX0NyZWF0ZVJlZ2lzdHJhdGlvblJlc3BvbnNlAG9wYXF1ZV9GaW5hbGl6ZVJlcXVlc3QAb3BhcXVlX1N0b3JlVXNlclJlY29yZABleHBhbmRfbWVzc2FnZV94bWQAZGVyaXZlX2tleXMAaGtkZl9leHBhbmRfbGFiZWwAZ2V0X3hjcmlwdABleHRyYWN0X2NyZWRlbnRpYWwAZXhwb3J0X2tleQBfX3ZsYV9leHByMABfX3ZsYV9leHByMQBzZW52AGNlbnYAYXV0aF9rZXkAdG1wAHBhZABjAGkAcgB4X2xlbgB4AHhfcwBfcmVzcABsZW4AaGtkZl9pbmZvAGF1dGhVAGlyAGNyeXB0b19oYXNoX3NoYTUxMl9zdGF0ZQBEU1QAeQBzYWx0AERTVF9zaXplAHNsAGNsAHJlc3VsdABkc3RfcHJpbWUAYl8wAGJfaQBsZW5faW5fYnl0ZXMAZWxsAG1zZ19wcmltZQBsX2lfYgBsX2lfYl9zdHIAb3V0AGxlZnQAY2xlbgB6X3BhZABiX2lpAHByawBoYW5kc2hha2Vfc2VjcmV0AGlrbQB0cmFuc2NyaXB0AGxhYmVsAGxsZW4AaGtkZmxhYmVsAHNlY3JldABvcHJmMQBlcHVicwBlbnZ1X2xlbgBlbnZ1AG9wcmYyAGVwdWJ1AGN1cnJlbnRfdGFyZ2V0AGNsYW5nIHZlcnNpb24gMTIuMC4wICgvYi9zL3cvaXIvY2FjaGUvZ2l0L2Nocm9taXVtLmdvb2dsZXNvdXJjZS5jb20tZXh0ZXJuYWwtZ2l0aHViLmNvbS1sbHZtLWxsdm0tLXByb2plY3QgOWYyMTk0N2EzMzEyMDNlZTI1NzlkYjg3ZjFkMWVjMjJhOTQ5ZTIwYSkAYXV4L2tkZl9oa2RmX3NoYTI1Ni5jAC9zcmMvc3JjAGxvbmcgdW5zaWduZWQgaW50AHNpemVfdAB1bnNpZ25lZCBjaGFyAHNvZGl1bV9tZW16ZXJvAHJhbmRvbWJ5dGVzX2J1ZgBjcnlwdG9fa2RmX2hrZGZfc2hhMjU2X2V4dHJhY3QAaW50AGNyeXB0b19rZGZfaGtkZl9zaGEyNTZfa2V5Z2VuAGNyeXB0b19rZGZfaGtkZl9zaGEyNTZfZXhwYW5kAGNyeXB0b19rZGZfaGtkZl9zaGEyNTZfa2V5Ynl0ZXMAY3J5cHRvX2tkZl9oa2RmX3NoYTI1Nl9ieXRlc19taW4AY3J5cHRvX2tkZl9oa2RmX3NoYTI1Nl9ieXRlc19tYXgAc3QAaWN0eABzdGF0ZQB1bnNpZ25lZCBpbnQAdWludDMyX3QAX19BUlJBWV9TSVpFX1RZUEVfXwBjb3VudABsb25nIGxvbmcgdW5zaWduZWQgaW50AHVpbnQ2NF90AGJ1ZgB1aW50OF90AGNyeXB0b19oYXNoX3NoYTI1Nl9zdGF0ZQBvY3R4AGNyeXB0b19hdXRoX2htYWNzaGEyNTZfc3RhdGUAc2FsdF9sZW4Ac2FsdABpa21fbGVuAGlrbQBwcmsAdG1wAGNvdW50ZXIAb3V0X2xlbgBjdHhfbGVuAGN0eABjaGFyAG91dABpAGxlZnQA';
if (!isDataURI(wasmBinaryFile)) {
  wasmBinaryFile = locateFile(wasmBinaryFile);
}

function getBinary() {
  try {
    if (wasmBinary) {
      return new Uint8Array(wasmBinary);
    }

    var binary = tryParseAsDataURI(wasmBinaryFile);
    if (binary) {
      return binary;
    }
    if (readBinary) {
      return readBinary(wasmBinaryFile);
    } else {
      throw "both async and sync fetching of the wasm failed";
    }
  }
  catch (err) {
    abort(err);
  }
}

function getBinaryPromise() {
  // If we don't have the binary yet, and have the Fetch api, use that;
  // in some environments, like Electron's render process, Fetch api may be present, but have a different context than expected, let's only use it on the Web
  if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === 'function'
      // Let's not use fetch to get objects over file:// as it's most likely Cordova which doesn't support fetch for file://
      && !isFileURI(wasmBinaryFile)
      ) {
    return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function(response) {
      if (!response['ok']) {
        throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
      }
      return response['arrayBuffer']();
    }).catch(function () {
      return getBinary();
    });
  }
  // Otherwise, getBinary should be able to get it synchronously
  return new Promise(function(resolve, reject) {
    resolve(getBinary());
  });
}



// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  // prepare imports
  var info = {
    'env': asmLibraryArg,
    'wasi_snapshot_preview1': asmLibraryArg
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    var exports = instance.exports;
    Module['asm'] = exports;
    removeRunDependency('wasm-instantiate');
  }
  // we can't run yet (except in a pthread, where we have a custom sync instantiator)
  addRunDependency('wasm-instantiate');


  function receiveInstantiatedSource(output) {
    // 'output' is a WebAssemblyInstantiatedSource object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above USE_PTHREADS-enabled path.
    receiveInstance(output['instance']);
  }


  function instantiateArrayBuffer(receiver) {
    return getBinaryPromise().then(function(binary) {
      return WebAssembly.instantiate(binary, info);
    }).then(receiver, function(reason) {
      err('failed to asynchronously prepare wasm: ' + reason);


      abort(reason);
    });
  }

  // Prefer streaming instantiation if available.
  function instantiateAsync() {
    if (!wasmBinary &&
        typeof WebAssembly.instantiateStreaming === 'function' &&
        !isDataURI(wasmBinaryFile) &&
        // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
        !isFileURI(wasmBinaryFile) &&
        typeof fetch === 'function') {
      fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function (response) {
        var result = WebAssembly.instantiateStreaming(response, info);
        return result.then(receiveInstantiatedSource, function(reason) {
            // We expect the most common failure cause to be a bad MIME type for the binary,
            // in which case falling back to ArrayBuffer instantiation should work.
            err('wasm streaming compile failed: ' + reason);
            err('falling back to ArrayBuffer instantiation');
            return instantiateArrayBuffer(receiveInstantiatedSource);
          });
      });
    } else {
      return instantiateArrayBuffer(receiveInstantiatedSource);
    }
  }
  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to run the instantiation parallel
  // to any other async startup actions they are performing.
  if (Module['instantiateWasm']) {
    try {
      var exports = Module['instantiateWasm'](info, receiveInstance);
      return exports;
    } catch(e) {
      err('Module.instantiateWasm callback failed with error: ' + e);
      return false;
    }
  }

  instantiateAsync();
  return {}; // no exports yet; we'll fill them in later
}


// Globals used by JS i64 conversions
var tempDouble;
var tempI64;

// === Body ===

var ASM_CONSTS = {
  1375: function() {return Module.getRandomValue();}
};

function _emscripten_asm_const_iii(code, sigPtr, argbuf) {
  var args = readAsmConstArgs(sigPtr, argbuf);

  return ASM_CONSTS[code].apply(null, args);
}



// STATICTOP = STATIC_BASE + 34704;
/* global initializers */  __ATINIT__.push({ func: function() { ___wasm_call_ctors() } });




/* no memory initializer */
// {{PRE_LIBRARY}}


  function demangle(func) {
      return func;
    }

  function demangleAll(text) {
      var regex =
        /\b_Z[\w\d_]+/g;
      return text.replace(regex,
        function(x) {
          var y = demangle(x);
          return x === y ? x : (y + ' [' + x + ']');
        });
    }

  function jsStackTrace() {
      var err = new Error();
      if (!err.stack) {
        // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
        // so try that as a special-case.
        try {
          throw new Error();
        } catch(e) {
          err = e;
        }
        if (!err.stack) {
          return '(no stack trace available)';
        }
      }
      return err.stack.toString();
    }

  function stackTrace() {
      var js = jsStackTrace();
      if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
      return demangleAll(js);
    }

  function ___assert_fail(condition, filename, line, func) {
      abort('Assertion failed: ' + UTF8ToString(condition) + ', at: ' + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
    }

  function _abort() {
      abort();
    }

  function _emscripten_get_sbrk_ptr() {
      return 35568;
    }

  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num);
    }

  
  function _emscripten_get_heap_size() {
      return HEAPU8.length;
    }
  
  function emscripten_realloc_buffer(size) {
      try {
        // round size grow request up to wasm page size (fixed 64KB per spec)
        wasmMemory.grow((size - buffer.byteLength + 65535) >>> 16); // .grow() takes a delta compared to the previous size
        updateGlobalBufferAndViews(wasmMemory.buffer);
        return 1 /*success*/;
      } catch(e) {
      }
    }function _emscripten_resize_heap(requestedSize) {
      requestedSize = requestedSize >>> 0;
      var oldSize = _emscripten_get_heap_size();
      // With pthreads, races can happen (another thread might increase the size in between), so return a failure, and let the caller retry.
  
  
      var PAGE_MULTIPLE = 65536;
  
      // Memory resize rules:
      // 1. When resizing, always produce a resized heap that is at least 16MB (to avoid tiny heap sizes receiving lots of repeated resizes at startup)
      // 2. Always increase heap size to at least the requested size, rounded up to next page multiple.
      // 3a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap geometrically: increase the heap size according to 
      //                                         MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%),
      //                                         At most overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
      // 3b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap linearly: increase the heap size by at least MEMORY_GROWTH_LINEAR_STEP bytes.
      // 4. Max size for the heap is capped at 2048MB-PAGE_MULTIPLE, or by MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
      // 5. If we were unable to allocate as much memory, it may be due to over-eager decision to excessively reserve due to (3) above.
      //    Hence if an allocation fails, cut down on the amount of excess growth, in an attempt to succeed to perform a smaller allocation.
  
      // A limit was set for how much we can grow. We should not exceed that
      // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
      var maxHeapSize = 2147483648;
      if (requestedSize > maxHeapSize) {
        return false;
      }
  
      var minHeapSize = 16777216;
  
      // Loop through potential heap size increases. If we attempt a too eager reservation that fails, cut down on the
      // attempted size and reserve a smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
      for(var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown); // ensure geometric growth
        // but limit overreserving (default to capping at +96MB overgrowth at most)
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296 );
  
  
        var newSize = Math.min(maxHeapSize, alignUp(Math.max(minHeapSize, requestedSize, overGrownHeapSize), PAGE_MULTIPLE));
  
        var replacement = emscripten_realloc_buffer(newSize);
        if (replacement) {
  
          return true;
        }
      }
      return false;
    }

  
  var readAsmConstArgsArray=[];function readAsmConstArgs(sigPtr, buf) {
      readAsmConstArgsArray.length = 0;
      var ch;
      // Most arguments are i32s, so shift the buffer pointer so it is a plain
      // index into HEAP32.
      buf >>= 2;
      while (ch = HEAPU8[sigPtr++]) {
        // A double takes two 32-bit slots, and must also be aligned - the backend
        // will emit padding to avoid that.
        var double = ch < 105;
        if (double && (buf & 1)) buf++;
        readAsmConstArgsArray.push(double ? HEAPF64[buf++ >> 1] : HEAP32[buf]);
        ++buf;
      }
      return readAsmConstArgsArray;
    }
var ASSERTIONS = false;



/** @type {function(string, boolean=, number=)} */
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      if (ASSERTIONS) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      }
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}


// Copied from https://github.com/strophe/strophejs/blob/e06d027/src/polyfills.js#L149

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

/**
 * Decodes a base64 string.
 * @param {string} input The string to decode.
 */
var decodeBase64 = typeof atob === 'function' ? atob : function (input) {
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  var output = '';
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
  do {
    enc1 = keyStr.indexOf(input.charAt(i++));
    enc2 = keyStr.indexOf(input.charAt(i++));
    enc3 = keyStr.indexOf(input.charAt(i++));
    enc4 = keyStr.indexOf(input.charAt(i++));

    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 !== 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output = output + String.fromCharCode(chr3);
    }
  } while (i < input.length);
  return output;
};

// Converts a string of base64 into a byte array.
// Throws error on invalid input.
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE === 'boolean' && ENVIRONMENT_IS_NODE) {
    var buf;
    try {
      // TODO: Update Node.js externs, Closure does not recognize the following Buffer.from()
      /**@suppress{checkTypes}*/
      buf = Buffer.from(s, 'base64');
    } catch (_) {
      buf = new Buffer(s, 'base64');
    }
    return new Uint8Array(buf['buffer'], buf['byteOffset'], buf['byteLength']);
  }

  try {
    var decoded = decodeBase64(s);
    var bytes = new Uint8Array(decoded.length);
    for (var i = 0 ; i < decoded.length ; ++i) {
      bytes[i] = decoded.charCodeAt(i);
    }
    return bytes;
  } catch (_) {
    throw new Error('Converting base64 string to bytes failed.');
  }
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}


var asmGlobalArg = {};
var asmLibraryArg = { "__assert_fail": ___assert_fail, "abort": _abort, "emscripten_asm_const_iii": _emscripten_asm_const_iii, "emscripten_get_sbrk_ptr": _emscripten_get_sbrk_ptr, "emscripten_memcpy_big": _emscripten_memcpy_big, "emscripten_resize_heap": _emscripten_resize_heap, "memory": wasmMemory, "table": wasmTable };
var asm = createWasm();
/** @type {function(...*):?} */
var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function() {
  return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["__wasm_call_ctors"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_crypto_auth_hmacsha256_BYTES = Module["_opaquejs_crypto_auth_hmacsha256_BYTES"] = function() {
  return (_opaquejs_crypto_auth_hmacsha256_BYTES = Module["_opaquejs_crypto_auth_hmacsha256_BYTES"] = Module["asm"]["opaquejs_crypto_auth_hmacsha256_BYTES"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_crypto_core_ristretto255_BYTES = Module["_opaquejs_crypto_core_ristretto255_BYTES"] = function() {
  return (_opaquejs_crypto_core_ristretto255_BYTES = Module["_opaquejs_crypto_core_ristretto255_BYTES"] = Module["asm"]["opaquejs_crypto_core_ristretto255_BYTES"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_crypto_hash_sha256_BYTES = Module["_opaquejs_crypto_hash_sha256_BYTES"] = function() {
  return (_opaquejs_crypto_hash_sha256_BYTES = Module["_opaquejs_crypto_hash_sha256_BYTES"] = Module["asm"]["opaquejs_crypto_hash_sha256_BYTES"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_crypto_scalarmult_BYTES = Module["_opaquejs_crypto_scalarmult_BYTES"] = function() {
  return (_opaquejs_crypto_scalarmult_BYTES = Module["_opaquejs_crypto_scalarmult_BYTES"] = Module["asm"]["opaquejs_crypto_scalarmult_BYTES"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_crypto_scalarmult_SCALARBYTES = Module["_opaquejs_crypto_scalarmult_SCALARBYTES"] = function() {
  return (_opaquejs_crypto_scalarmult_SCALARBYTES = Module["_opaquejs_crypto_scalarmult_SCALARBYTES"] = Module["asm"]["opaquejs_crypto_scalarmult_SCALARBYTES"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_crypto_secretbox_KEYBYTES = Module["_opaquejs_crypto_secretbox_KEYBYTES"] = function() {
  return (_opaquejs_crypto_secretbox_KEYBYTES = Module["_opaquejs_crypto_secretbox_KEYBYTES"] = Module["asm"]["opaquejs_crypto_secretbox_KEYBYTES"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_OPAQUE_USER_RECORD_LEN = Module["_opaquejs_OPAQUE_USER_RECORD_LEN"] = function() {
  return (_opaquejs_OPAQUE_USER_RECORD_LEN = Module["_opaquejs_OPAQUE_USER_RECORD_LEN"] = Module["asm"]["opaquejs_OPAQUE_USER_RECORD_LEN"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_OPAQUE_REGISTER_PUBLIC_LEN = Module["_opaquejs_OPAQUE_REGISTER_PUBLIC_LEN"] = function() {
  return (_opaquejs_OPAQUE_REGISTER_PUBLIC_LEN = Module["_opaquejs_OPAQUE_REGISTER_PUBLIC_LEN"] = Module["asm"]["opaquejs_OPAQUE_REGISTER_PUBLIC_LEN"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_OPAQUE_REGISTER_SECRET_LEN = Module["_opaquejs_OPAQUE_REGISTER_SECRET_LEN"] = function() {
  return (_opaquejs_OPAQUE_REGISTER_SECRET_LEN = Module["_opaquejs_OPAQUE_REGISTER_SECRET_LEN"] = Module["asm"]["opaquejs_OPAQUE_REGISTER_SECRET_LEN"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_OPAQUE_SERVER_SESSION_LEN = Module["_opaquejs_OPAQUE_SERVER_SESSION_LEN"] = function() {
  return (_opaquejs_OPAQUE_SERVER_SESSION_LEN = Module["_opaquejs_OPAQUE_SERVER_SESSION_LEN"] = Module["asm"]["opaquejs_OPAQUE_SERVER_SESSION_LEN"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_OPAQUE_REGISTER_USER_SEC_LEN = Module["_opaquejs_OPAQUE_REGISTER_USER_SEC_LEN"] = function() {
  return (_opaquejs_OPAQUE_REGISTER_USER_SEC_LEN = Module["_opaquejs_OPAQUE_REGISTER_USER_SEC_LEN"] = Module["asm"]["opaquejs_OPAQUE_REGISTER_USER_SEC_LEN"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_OPAQUE_USER_SESSION_PUBLIC_LEN = Module["_opaquejs_OPAQUE_USER_SESSION_PUBLIC_LEN"] = function() {
  return (_opaquejs_OPAQUE_USER_SESSION_PUBLIC_LEN = Module["_opaquejs_OPAQUE_USER_SESSION_PUBLIC_LEN"] = Module["asm"]["opaquejs_OPAQUE_USER_SESSION_PUBLIC_LEN"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_OPAQUE_USER_SESSION_SECRET_LEN = Module["_opaquejs_OPAQUE_USER_SESSION_SECRET_LEN"] = function() {
  return (_opaquejs_OPAQUE_USER_SESSION_SECRET_LEN = Module["_opaquejs_OPAQUE_USER_SESSION_SECRET_LEN"] = Module["asm"]["opaquejs_OPAQUE_USER_SESSION_SECRET_LEN"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_OPAQUE_SERVER_AUTH_CTX_LEN = Module["_opaquejs_OPAQUE_SERVER_AUTH_CTX_LEN"] = function() {
  return (_opaquejs_OPAQUE_SERVER_AUTH_CTX_LEN = Module["_opaquejs_OPAQUE_SERVER_AUTH_CTX_LEN"] = Module["asm"]["opaquejs_OPAQUE_SERVER_AUTH_CTX_LEN"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_GenServerKeyPair = Module["_opaquejs_GenServerKeyPair"] = function() {
  return (_opaquejs_GenServerKeyPair = Module["_opaquejs_GenServerKeyPair"] = Module["asm"]["opaquejs_GenServerKeyPair"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_Register = Module["_opaquejs_Register"] = function() {
  return (_opaquejs_Register = Module["_opaquejs_Register"] = Module["asm"]["opaquejs_Register"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_CreateCredentialRequest = Module["_opaquejs_CreateCredentialRequest"] = function() {
  return (_opaquejs_CreateCredentialRequest = Module["_opaquejs_CreateCredentialRequest"] = Module["asm"]["opaquejs_CreateCredentialRequest"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_CreateCredentialResponse = Module["_opaquejs_CreateCredentialResponse"] = function() {
  return (_opaquejs_CreateCredentialResponse = Module["_opaquejs_CreateCredentialResponse"] = Module["asm"]["opaquejs_CreateCredentialResponse"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_RecoverCredentials = Module["_opaquejs_RecoverCredentials"] = function() {
  return (_opaquejs_RecoverCredentials = Module["_opaquejs_RecoverCredentials"] = Module["asm"]["opaquejs_RecoverCredentials"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_UserAuth = Module["_opaquejs_UserAuth"] = function() {
  return (_opaquejs_UserAuth = Module["_opaquejs_UserAuth"] = Module["asm"]["opaquejs_UserAuth"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_CreateRegistrationRequest = Module["_opaquejs_CreateRegistrationRequest"] = function() {
  return (_opaquejs_CreateRegistrationRequest = Module["_opaquejs_CreateRegistrationRequest"] = Module["asm"]["opaquejs_CreateRegistrationRequest"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_CreateRegistrationResponse = Module["_opaquejs_CreateRegistrationResponse"] = function() {
  return (_opaquejs_CreateRegistrationResponse = Module["_opaquejs_CreateRegistrationResponse"] = Module["asm"]["opaquejs_CreateRegistrationResponse"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_Create1kRegistrationResponse = Module["_opaquejs_Create1kRegistrationResponse"] = function() {
  return (_opaquejs_Create1kRegistrationResponse = Module["_opaquejs_Create1kRegistrationResponse"] = Module["asm"]["opaquejs_Create1kRegistrationResponse"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_FinalizeRequest = Module["_opaquejs_FinalizeRequest"] = function() {
  return (_opaquejs_FinalizeRequest = Module["_opaquejs_FinalizeRequest"] = Module["asm"]["opaquejs_FinalizeRequest"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_StoreUserRecord = Module["_opaquejs_StoreUserRecord"] = function() {
  return (_opaquejs_StoreUserRecord = Module["_opaquejs_StoreUserRecord"] = Module["asm"]["opaquejs_StoreUserRecord"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_Store1kUserRecord = Module["_opaquejs_Store1kUserRecord"] = function() {
  return (_opaquejs_Store1kUserRecord = Module["_opaquejs_Store1kUserRecord"] = Module["asm"]["opaquejs_Store1kUserRecord"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_envelope_len = Module["_opaquejs_envelope_len"] = function() {
  return (_opaquejs_envelope_len = Module["_opaquejs_envelope_len"] = Module["asm"]["opaquejs_envelope_len"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opaquejs_server_public_key_from_user_record = Module["_opaquejs_server_public_key_from_user_record"] = function() {
  return (_opaquejs_server_public_key_from_user_record = Module["_opaquejs_server_public_key_from_user_record"] = Module["asm"]["opaquejs_server_public_key_from_user_record"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var ___errno_location = Module["___errno_location"] = function() {
  return (___errno_location = Module["___errno_location"] = Module["asm"]["__errno_location"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _free = Module["_free"] = function() {
  return (_free = Module["_free"] = Module["asm"]["free"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _malloc = Module["_malloc"] = function() {
  return (_malloc = Module["_malloc"] = Module["asm"]["malloc"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var stackSave = Module["stackSave"] = function() {
  return (stackSave = Module["stackSave"] = Module["asm"]["stackSave"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var stackRestore = Module["stackRestore"] = function() {
  return (stackRestore = Module["stackRestore"] = Module["asm"]["stackRestore"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var stackAlloc = Module["stackAlloc"] = function() {
  return (stackAlloc = Module["stackAlloc"] = Module["asm"]["stackAlloc"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var __growWasmMemory = Module["__growWasmMemory"] = function() {
  return (__growWasmMemory = Module["__growWasmMemory"] = Module["asm"]["__growWasmMemory"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var dynCall_iiii = Module["dynCall_iiii"] = function() {
  return (dynCall_iiii = Module["dynCall_iiii"] = Module["asm"]["dynCall_iiii"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var dynCall_iii = Module["dynCall_iii"] = function() {
  return (dynCall_iii = Module["dynCall_iii"] = Module["asm"]["dynCall_iii"]).apply(null, arguments);
};





// === Auto-generated postamble setup entry stuff ===





Module["cwrap"] = cwrap;
Module["setValue"] = setValue;
Module["getValue"] = getValue;



Module["UTF8ToString"] = UTF8ToString;

Module["stringToUTF8"] = stringToUTF8;




















































































































































var calledRun;

/**
 * @constructor
 * @this {ExitStatus}
 */
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
}

var calledMain = false;


dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};





/** @type {function(Array=)} */
function run(args) {
  args = args || arguments_;

  if (runDependencies > 0) {
    return;
  }


  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    preMain();

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();


    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
}
Module['run'] = run;


/** @param {boolean|number=} implicit */
function exit(status, implicit) {

  // if this is just main exit-ing implicitly, and the status is 0, then we
  // don't need to do anything here and can just leave. if the status is
  // non-zero, though, then we need to report it.
  // (we may have warned about this earlier, if a situation justifies doing so)
  if (implicit && noExitRuntime && status === 0) {
    return;
  }

  if (noExitRuntime) {
  } else {

    ABORT = true;
    EXITSTATUS = status;

    exitRuntime();

    if (Module['onExit']) Module['onExit'](status);
  }

  quit_(status, new ExitStatus(status));
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}


  noExitRuntime = true;

run();






// {{MODULE_ADDITIONS}}



    });
    // https://github.com/jedisct1/libsodium.js/blob/master/wrapper/libsodium-post.js
    if (
      typeof process === "object" &&
      typeof process.removeAllListeners === "function"
    ) {
      process.removeAllListeners("uncaughtException");
      process.removeAllListeners("unhandledRejection");
    }
    return Module;
  }

  if (typeof define === "function" && define.amd) {
    define(["exports"], exposeLibopaque);
  } else if (
    typeof exports === "object" &&
    typeof exports.nodeName !== "string"
  ) {
    exposeLibopaque(exports);
  } else {
    root.libopaque = exposeLibopaque(
      root.libopaque_mod || (root.commonJsStrict = {})
    );
  }
})(this);


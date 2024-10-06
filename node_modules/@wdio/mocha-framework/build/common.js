// src/common.ts
import { wrapGlobalTestMethod } from "@wdio/utils";

// src/constants.ts
var INTERFACES = {
  bdd: ["it", "specify", "before", "beforeEach", "after", "afterEach"],
  tdd: ["test", "suiteSetup", "setup", "suiteTeardown", "teardown"],
  qunit: ["test", "before", "beforeEach", "after", "afterEach"]
};
var TEST_INTERFACES = {
  bdd: ["it", "specify"],
  tdd: ["test"],
  qunit: ["test"]
};
var MOCHA_TIMEOUT_MESSAGE = 'For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.';

// src/common.ts
var MOCHA_UI_TYPE_EXTRACTOR = /^(?:.*-)?([^-.]+)(?:.js)?$/;
var DEFAULT_INTERFACE_TYPE = "bdd";
function formatMessage(params) {
  const message = {
    type: params.type
  };
  const mochaAllHooksIfPresent = params.payload?.title?.match(/^"(before|after)( all| each)?" hook/);
  if (params.err) {
    if (params.err && params.err.message && params.err.message.includes(MOCHA_TIMEOUT_MESSAGE)) {
      const replacement = `The execution in the test "${params.payload.parent.title} ${params.payload.title}" took too long. Try to reduce the run time or increase your timeout for test specs (https://webdriver.io/docs/timeouts).`;
      params.err.message = params.err.message.replace(MOCHA_TIMEOUT_MESSAGE, replacement);
      params.err.stack = params.err.stack.replace(MOCHA_TIMEOUT_MESSAGE, replacement);
    }
    message.error = {
      name: params.err.name,
      message: params.err.message,
      stack: params.err.stack,
      type: params.err.type || params.err.name,
      expected: params.err.expected,
      actual: params.err.actual
    };
    if (mochaAllHooksIfPresent) {
      message.type = "hook:end";
    }
  }
  if (params.payload) {
    message.title = params.payload.title;
    message.parent = params.payload.parent ? params.payload.parent.title : null;
    let fullTitle = message.title;
    if (params.payload.parent) {
      let parent = params.payload.parent;
      while (parent && parent.title) {
        fullTitle = parent.title + "." + fullTitle;
        parent = parent.parent;
      }
    }
    message.fullTitle = fullTitle;
    message.pending = params.payload.pending || false;
    message.file = params.payload.file;
    message.duration = params.payload.duration;
    message.body = params.payload.body;
    if (params.payload.ctx && params.payload.ctx.currentTest) {
      message.currentTest = params.payload.ctx.currentTest.title;
    }
    if (params.type.match(/Test/)) {
      message.passed = params.payload.state === "passed";
    }
    if (params.payload.parent?.title && mochaAllHooksIfPresent) {
      const hookName = mochaAllHooksIfPresent[0];
      message.title = `${hookName} for ${params.payload.parent.title}`;
    }
    if (params.payload.context) {
      message.context = params.payload.context;
    }
  }
  return message;
}
function requireExternalModules(mods, loader = loadModule) {
  return mods.map((mod) => {
    if (!mod) {
      return Promise.resolve();
    }
    mod = mod.replace(/.*:/, "");
    if (mod.startsWith("./") && globalThis.process) {
      mod = `${globalThis.process.cwd()}/${mod.slice(2)}`;
    }
    return loader(mod);
  });
}
function setupEnv(cid, options, beforeTest, beforeHook, afterTest, afterHook) {
  const match = MOCHA_UI_TYPE_EXTRACTOR.exec(options.ui);
  const type = match && INTERFACES[match[1]] && match[1] || DEFAULT_INTERFACE_TYPE;
  const hookArgsFn = (context) => {
    return [{ ...context.test, parent: context.test?.parent?.title }, context];
  };
  INTERFACES[type].forEach((fnName) => {
    const isTest = TEST_INTERFACES[type].flatMap((testCommand) => [testCommand, testCommand + ".only"]).includes(fnName);
    wrapGlobalTestMethod(
      isTest,
      isTest ? beforeTest : beforeHook,
      // @ts-ignore
      hookArgsFn,
      isTest ? afterTest : afterHook,
      hookArgsFn,
      fnName,
      cid
    );
  });
  const { compilers = [] } = options;
  return requireExternalModules([...compilers]);
}
async function loadModule(name) {
  try {
    return await import(
      /* @vite-ignore */
      name
    );
  } catch (err) {
    throw new Error(`Module ${name} can't get loaded. Are you sure you have installed it?
Note: if you've installed WebdriverIO globally you need to install these external modules globally too!`);
  }
}
export {
  formatMessage,
  loadModule,
  requireExternalModules,
  setupEnv
};

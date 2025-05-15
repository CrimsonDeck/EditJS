let editor;
    require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.44.0/min/vs' } });
    require(["vs/editor/editor.main"], function () {
      editor = monaco.editor.create(document.getElementById("editor"), {
        value: "console.log('Hello, world!');",
        language: "javascript",
        theme: "vs-dark",
        automaticLayout: true
      });
    });

    function runCode() {
      const code = editor.getValue();
      let output = '';
      const originalLog = console.log;
      console.log = (...args) => {
        output += args.join(" ") + "\n";
      };
      try {
        eval(code);
      } catch (e) {
        output += e.message;
      }
      console.log = originalLog;
      document.getElementById("output").textContent = output;
    }

    function exportCode() {
      const code = editor.getValue();
      const blob = new Blob([code], { type: 'application/javascript' });
      saveAs(blob, 'script.js');
    }

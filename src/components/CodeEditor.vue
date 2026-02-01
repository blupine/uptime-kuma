<template>
    <div>
        <textarea ref="codeEditor"></textarea>
    </div>
</template>
<script>
import { onMounted, ref } from "vue";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/javascript/javascript";
export default {
    props: {
        modelValue: {
            type: String,
            default: "",
        },
    },
    emits: [ "update:modelValue" ],
    setup(props, { emit }) {
        const codeEditor = ref(null);
        let editor;
        onMounted(() => {
            editor = CodeMirror.fromTextArea(codeEditor.value, {
                lineNumbers: true,
                mode: "javascript",
                theme: "default",
            });
            if (document.body.classList.contains("dark")) {
                editor.setOption("theme", "monokai");
            }
            editor.setValue(props.modelValue);
            editor.on("change", () => {
                emit("update:modelValue", editor.getValue());
            });
        });
        return {
            codeEditor,
        };
    },
};
</script>
<style lang="scss">
@import "../assets/vars.scss";
@import "../assets/app.scss";
.CodeMirror {
    clip-path: none !important;
    border: 1px solid #ced4da;
    border-radius: 19px;
    font-family: monospace;
    line-height: 1.5;
    height: auto;
    &.CodeMirror-focused {
        border-color: $highlight;
        outline: 0;
        box-shadow: 0 0 0 .25rem rgba(92,221,139,.25);
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    .dark & {
        border: 1px solid $dark-border-color
    }
}
.CodeMirror-gutter {
    padding-right: 12px;
    .dark & {
        border-right: 1px solid #d0d0d0
    }
}
.CodeMirror pre.CodeMirror-line, .CodeMirror pre.CodeMirror-line-like {
    padding-left: 10px;
}
</style>
export default function (context) {
    context.store.dispatch("cookie/init", context);
}

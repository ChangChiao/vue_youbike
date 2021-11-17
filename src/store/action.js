//登出
export function logout(context) {
    const tId = adminUse.Cookie("cAa");
    const data = {
        tId: tId
    };
    context.commit("updLoading", true);
    adminUse
        .getAjax(
            context.state.config.groupPath.platformAdmin + "/backLogOut",
            data
        )
        .then((resultData) => {
            context.commit("updLoading", false);
            if (resultData.resultCode == "000") {
                adminUse.Cookie("remove", "cAa");
                context.commit("updMenuList", "");
                context.commit("updUserName", "");
                context.commit("updIsLogin", false);
                adminUse.showToast(resultData.msg);
                router.push("/login");
            } else {
                adminUse.showToast(
                    resultData.msg + "(" + resultData.resultCode + ")",
                    "red"
                );
            }
        });
}

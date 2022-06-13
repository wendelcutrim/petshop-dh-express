const cloneDeep = require("clone-deep");

let pessoa = {
    nome: 'Wendel',
    idade: 24,
    email: "wendel@mail.com",
    redesSocial: {
        instagram: "wendel-instagram",
        github: "wendel-github",
        facebook: "wendel-facebook"
    }
}

console.log(pessoa);
console.log(".".repeat(99));

/* let novaPessoa = {...pessoa}
console.log("Nova pessoa (Clone)")
console.log(novaPessoa);
console.log("-".repeat(99))

novaPessoa.nome = "Ian";
novaPessoa.idade = 24;
novaPessoa.email = "ian@mail.com";
novaPessoa.redesSocial.instagram = "ian-insta";
novaPessoa.redesSocial.github = "ian-github";
novaPessoa.redesSocial.facebook = "ian-facebook";

console.log("Após alterar os dados da nova pessoa para os dados do Ian");
console.log(novaPessoa);
console.log("-".repeat(99))
console.log("Dados da variável pessoa (wendel) após inserir os dados do Ian no objeto clonado com spread");
console.log(pessoa);
console.log("-".repeat(99)) */

//correção com clonagem profunda
let novaPessoa2 = cloneDeep(pessoa);
novaPessoa2.nome = "Ian";
novaPessoa2.idade = 24;
novaPessoa2.email = "ian@mail.com";
novaPessoa2.redesSocial.instagram = "ian-insta";
novaPessoa2.redesSocial.github = "ian-github";
novaPessoa2.redesSocial.facebook = "ian-facebook";

console.log("Variável pessoa (Wendel)");
console.log(pessoa);
console.log("-".repeat(99))
console.log("Variável pessoa (novaPessoa2) com clonagem profunda");
console.log(novaPessoa2);
console.log("-".repeat(99))
console.log("Variável (pessoa) Wendel, após clonagem profunda");
console.log(pessoa);


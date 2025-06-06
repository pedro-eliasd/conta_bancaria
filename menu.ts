import leia = require ("readline-sync");
import {colors} from './src/util/colors';
import { Conta } from "./src/model/Conta";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";
import { ContaControler } from "./src/controller/ContaController";


export function main(){
    let contas : ContaControler = new ContaControler();

    let opcao, numero, agencia, tipo, saldo, limite, aniversario, valor, numeroDestino : number;
    let titular : string;
    const tipoContas = ['Conta Corrente', 'Conta Poupanca'];

    while (true){
        console.log(colors.bg.black, colors.fg.yellow,
                    "*****************************************************");
        console.log("                                                     ");
        console.log("                BANCO DO BRAZIL COM Z                ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Criar Conta                          ");
        console.log("            2 - Listar todas as Contas               ");
        console.log("            3 - Buscar Conta por Numero              ");
        console.log("            4 - Atualizar Dados da Conta             ");
        console.log("            5 - Apagar Conta                         ");
        console.log("            6 - Sacar                                ");
        console.log("            7 - Depositar                            ");
        console.log("            8 - Transferir valores entre Contas      ");
        console.log("            9 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     "
                    , colors.reset
        );

        console.log('Entre com a opção desejada: ');
        opcao = leia.questionInt("");

        if(opcao == 9){
            console.log(colors.fg.greenstrong, 
                        "\nBanco do Brazil com Z - o seu futuro começa aqui!");
            sobre();
            console.log(colors.reset);
            process.exit(0);
        }

        switch (opcao){
            case 1:
                console.log(colors.fg.whitestrong, 
                    '\n\nCriar conta\n\n', colors.reset);

                console.log('Digite o número da agencia: ');
                agencia = leia.questionInt("");

                console.log('Digite o tipo da conta: ');
                tipo = leia.keyInSelect(tipoContas, "", {cancel: false}) +1;

                console.log('Digite o nome do titular: ');
                titular = leia.question("");

                console.log('Digite o saldo da conta: ');
                saldo = leia.questionFloat("");

                switch(tipo){
                    case 1:
                        console.log('Digite o limite da conta (R$): ')
                        limite = leia.questionFloat("");
                        contas.cadastrar(new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite));

                        break;
                    
                    case 2:
                        console.log('Digite o dia do aniversário da Conta Poupança: ');
                        aniversario = leia.questionInt("");
                        contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario));

                        break;
                }

                keyPress();
                break;
            case 2:
                console.log(colors.fg.whitestrong, 
                    '\n\nListar todas as contas\n\n', colors.reset);

                contas.listarTodas()

                keyPress();
                break;
            case 3:
                console.log(colors.fg.whitestrong, 
                    '\n\nConsultar dados da conta - por número\n\n', colors.reset);

                    console.log('Digite o número da conta: ')
                    numero = leia.questionInt('');
                    contas.procurarPorNumero(numero);

                keyPress();
                break;
            case 4:
                console.log(colors.fg.whitestrong, 
                    '\n\nAtualizar dados da conta\n\n', colors.reset);

                    console.log('Digite o número da conta: ');
                    numero = leia.questionInt('');

                    let conta = contas.buscarNoArray(numero);

                    if (conta !== null){
                        console.log('Digite o número da agência: ')
                        agencia = leia.questionInt('');

                        tipo = conta.tipo;

                        console.log('Digite o nome do titular: ')
                        titular = leia.question('');

                        console.log('Digite o saldo da conta: ')
                        saldo = leia.questionFloat('');

                        switch(tipo){
                            case 1:
                                console.log('Digite o limite da conta(R$): ');
                                limite = leia.questionFloat('');
                                contas.atualizar(new ContaCorrente(numero, agencia, tipo, titular, saldo, limite));
                                break;
                            case 2:
                                console.log('Digite o dia do aniversário da Conta Poupança: ');
                                aniversario = leia.questionInt("");
                                contas.atualizar(new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario));
                                break;
                        }
                    }else{
                        console.log(`A conta número: ${numero} não foi encontrada.`)
                    }

                keyPress();
                break;
            case 5:
                console.log(colors.fg.whitestrong, 
                    '\n\nApagar uma conta\n\n', colors.reset);
                console.log('Digite o número da conta: ');
                numero = leia.questionInt('');
                contas.deletar(numero);

                keyPress();
                break;
            case 6:
                console.log(colors.fg.whitestrong, 
                    '\n\nSaque\n\n', colors.reset);

                    console.log('Digite o número da conta: ');
                    numero = leia.questionInt('');

                    console.log('Digite o valor do saque(R$): ');
                    valor = leia.questionFloat('');

                    contas.sacar(numero, valor);

                keyPress();
                break;
            case 7:
                console.log(colors.fg.whitestrong, 
                    '\n\nDepósito\n\n', colors.reset);

                console.log('Digite o número da conta: ');
                numero = leia.questionInt('');

                console.log('Digite o valor do deposito(R$): ');
                valor = leia.questionFloat('');

                contas.depositar(numero, valor);

                keyPress();
                break;
            case 8:
                console.log(colors.fg.whitestrong, 
                    '\n\nTransferência entre contas\n\n', colors.reset);

                console.log('Digite o número da conta de origem: ');
                numero = leia.questionInt('');
                
                console.log('Digite o numero da conta de destino: ');
                numeroDestino = leia.questionInt();

                console.log('\nDigite o valor do deposito (R$): ');
                valor = leia.questionFloat();

                contas.transferir(numero, numeroDestino, valor);
                keyPress();
                break;
            default:
                console.log(colors.fg.whitestrong, 
                    '\nOpção inválida.\n', colors.reset);
                keyPress();
                break;
        }
    }
}

function sobre(): void{
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: Pedro Elias");
    console.log("Generation Brasil - generation@generation.org");
    console.log("github.com/pedro-eliasd");
    console.log("*****************************************************");
}

function keyPress(): void{
    console.log(colors.reset, '');
    console.log('Pressione enter para continuar...');
    leia.prompt();
}

main();
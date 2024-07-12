const locators = {
    LOGIN_PAGE: {
        USERNAME: '#username',
        BTN_ENTRAR: `//input[@value="Login"]`
    },
    LOGIN_PAGE_PASSWORD: {
        PASSWORD: '#password',
        BTN_ENTRAR: `//input[@value="Entrar"]`
    },
    MY_VIEW_PAGE: {
        NAVBAR:{
            LOGO_MANTIS: `//div/a/span[contains(text(), 'MantisBT')]`
        },
        SIDEBAR: {
            LINK_CRIAR_TAREFA: `//a[contains(@href, "/bug_report_page.php")]`,
            FORM_CRIAR_TAREFA:{
                CRIAR_TAREFA_LISTA: '#category_id',
                FREQUENCIA_LISTA: '#reproducibility',
                GRAVIDADE_LISTA: '#severity',
                PRIORIDADE_LISTA: '#priority',
                RESUMO: '#summary',
                DESCRICAO: '#description',
                PASSOS_REPRODUZIR: '#steps_to_reproduce',
                INFORMACOES_ADICIONAIS: '#additional_info',
                APLICAR_MARCADORES: '#tag_select',
                ENVIAR_ARQUIVOS: `//div/i[starts-with(@class, "upload-icon")]`,
                BTN_CRIAR_TAREFA: `//input[contains(@value, "Criar Nova Tarefa")]`
            }
        }
    },
    BUG_REPORT_PAGE:{
        ALERT_OPERACAO_REALIZADA_SUCESSO: '.alert',
        ALERT_APPLICATION_ERROR: `//div[starts-with(@class, "alert alert-danger")]`
    },
    VIEW_ALL_BUG_PAGE:{
        FILTROS:{
            INPUT_PROCURAR: '#filter-search-txt',
            BTN_APLICAR_FILTRO: `//div/input[2][contains(@name, "filter_submit")]`,
            BTN_REDEFINIR: `//div[starts-with(@class,"btn")]/a[contains(@href, "view_all_set.php?type=0")]`
        },
        TABELA_BUGLIST:{
            COLUNA_ID: `//td/a[contains(@href, "/view.php?id=1095")]`
        }
    }
}

export default locators;
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
            LINK_CRIAR_TAREFA: `//ul[contains(@class, "nav nav-list")]/li[3]/a`,
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
            },
            LINK_MINHA_VISAO: `//a/span[contains(text(), "Minha Visão")]`,
            TABELAS_MINHA_VISAO:{
                TABELA_MONITORADOS_POR_MIM: `//div[contains(@id, "monitored")]//div[contains(@class, "widget-body")]/div/div/table/tbody/tr/td/a[contains(text(), "0001095")]`,
                BTN_VER_TAREFAS_MONITORADOS_POR_MIM:`//a[starts-with(@href, "view_all_set.php?type=1&temporary=y&monitor_user_id=237&hide_status=90")][contains(text(),"View Issues")]`,
                TABELA_NAO_ATRIBUIDOS: '#unassigned',
                TABELA_RELATADOS_POR_MIM: '#reported',
                TABELA_MODIFICADOS_RECENTEMENTE: '#recent_mod'
            },
        },
    },
    BUG_REPORT_PAGE:{
        ALERT_OPERACAO_REALIZADA_SUCESSO: '.alert',
        ALERT_APPLICATION_ERROR: `//div[starts-with(@class, "alert alert-danger")]`,
        INFO_USER: `//span[contains(@class, "user-info")]`,
        LINK_SAIR: `//a[contains(@href, "logout_page.php")]`,
        REMOVER_ARQUIVO: '.dz-remove'
    },
    VIEW_ALL_BUG_PAGE:{
        FILTROS:{
            INPUT_PROCURAR: '#filter-search-txt',
            BTN_APLICAR_FILTRO: `//div/input[2][contains(@name, "filter_submit")]`,
            BTN_REDEFINIR: `//div[starts-with(@class,"btn")]/a[contains(@href, "view_all_set.php?type=0")]`
        },
        TABELA_BUGLIST:{
            COLUNA_ID: `//td[contains(@class, "column-id")]/a`,
            CKBOX_ID: `//input[contains(@type, "checkbox")][contains(@value, "1095")]`,
            BTN_IMPRIMIR_TAREFAS: `//div/a[contains(text(), "Imprimir Tarefas")]`,
            BTN_EXPORTAR_CSV: `//a[starts-with(@href, "csv")]`,
            BTN_EXPORTAR_EXCEL: `//a[starts-with(@href, "excel_xml")]`
        }
    },
    VIEW_DETALHES_TAREFA_PAGE:{
        BTN_IR_PARA_ANOTACOES: `//div/a[contains(text(),"Ir para as Anotações")]`,
        TXT_AREA_ANOTACOES: `//textarea[contains(@name,"bugnote")]`,
        ENVIAR_ARQUIVOS_TAREFA: `//div[contains(@class, "dropzone center dz-clickable")]/span[contains(text(), "Anexe arquivos arrastando")]`,
        BTN_ADICIONAR_ANOTACAO: `//input[contains(@value, "Adicionar Anotação")]`,
        CHECKBOX_VISIBILIDADE: '#bugnote_add_view_status',
        BTN_MONITORAR: `//input[contains(@value, "Monitorar")]`,
        BTN_PARAR_DE_MONITORAR: `//input[contains(@value, "Parar de Monitorar")]`
    },
    PRINT_ALL_BUG_PAGE:{
        LINK_PRINT_WORD: `//a[starts-with(@href, "print_all")][1]`
    },
}

export default locators;
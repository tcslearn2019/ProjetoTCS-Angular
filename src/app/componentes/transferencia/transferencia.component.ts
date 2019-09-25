import { Component, OnInit } from '@angular/core';
import { Transferencia } from '../../class/transferencia';
import { TransfServService } from '../../service/transf-serv.service';
import { Router } from '@angular/router';
import { ContaServiceService } from '../../service/conta-service.service';
import { Conta } from '../../class/conta';
import { TouchSequence } from 'selenium-webdriver';
import { Cliente } from '../../class/cliente';

@Component({
    selector: 'app-transferencia',
    templateUrl: './transferencia.component.html',
    styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

    private transf: Transferencia
    private msg: String
    private contaAtual: Conta
    private contas: Conta[]
    private numExiste: Boolean = false
    private transList: Transferencia[]

    clienteGeral: Cliente
    constructor(private serviceTrans: TransfServService, private router: Router, private serviceConta: ContaServiceService) { }

    ngOnInit() {
        setTimeout(() => {
            if (localStorage.getItem("cliente") === null) {
                this.router.navigate(["/login"])
            } else {
                this.clienteGeral = JSON.parse(localStorage.getItem("cliente"))
            }
            this.transf = new Transferencia()
            this.transList = new Array<Transferencia>();
            this.serviceTrans.listTransf().subscribe((result) => {
                result.forEach((item) => {
                    this.transList.push(item)
                })
            })
            this.contaAtual = this.serviceConta.getConta()
        }, 1);
    }

    transferir() {
        this.serviceConta.listAll().subscribe((result) => {
            this.contas = result
            if (this.validaConta()) {
                this.fazTransferencia()

            }
        })
    }

    validaConta() {
        this.contas.forEach((value) => {
            if (value.numConta == this.transf.idCreditoDTO) {
                this.numExiste = true
            }
        })
        if (!this.numExiste) {
            return false
        } else {
            return true
        }

    }

    fazTransferencia() {
        this.transf.idDebitoDTO = this.contaAtual.numConta
        this.serviceTrans.createTransf(this.transf).subscribe((result) => {
            this.transList.push(result)
            this.tranferiu()
        })
    }
    tranferiu() {
        alert('Transferência realizada')
    }

}

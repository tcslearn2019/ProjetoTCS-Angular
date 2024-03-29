import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/class/cliente'
import { HttpClient, HttpParams } from '@angular/common/http';

const baseUrl: String = "http://localhost:8080"


@Injectable({
    providedIn: 'root'
})
export class ClienteServiceService {

    constructor(private http: HttpClient) { }

    private cli:Cliente;

    getter():Cliente {
        return this.cli;
    }

    setter(cliente: Cliente) {
        this.cli = cliente;
    }

    private options: HttpParams
    createClient(cliente: Cliente) {
        return this.http.post(baseUrl + '/cliente/clienteAdd', JSON.stringify(cliente),
            { headers: { 'Content-Type': 'application/json' } });
    }


    verificaClient(cliente: Cliente) {
        return this.http.post(baseUrl + "/cliente/verificaCliente", JSON.stringify(cliente), { headers: { 'Content-Type': 'application/json' } })
    }

    buscarClient(id: Number) {
        this.options = new HttpParams();
        this.options = this.options.append('id', id.toString())
        const param = { params: this.options }
        return this.http.get(baseUrl + "/cliente/buscarCliente", param)
    }

    buscarCpf(cpf: String) {
        this.options = new HttpParams();
        this.options = this.options.append('cpf', cpf.toString())
        const param = { params: this.options }
        return this.http.get<Cliente>(baseUrl + "/cliente/buscarCpf", param)
    }

    buscarFixed() {
        return this.http.get<Cliente>(baseUrl + "/cliente/fixedCliente")
    }
}

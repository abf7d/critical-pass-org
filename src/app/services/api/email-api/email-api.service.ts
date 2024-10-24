import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import urlJoin from 'url-join';
// import * as CONST from '../../constants/constants';
// import { environment } from '@critical-pass/shared/environments';
import { Observable, map } from 'rxjs';
import { ContactForm } from '../../../types/contact-form';
import { environment } from '../../../../config/environment';

@Injectable({
    providedIn: 'root',
})
export class EmailApiService {
    private baseUrl!: string;

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.criticalPassApi;
    }

    public contactUs(form: ContactForm, secure: boolean): Observable<ResultMessage> {
        const body = JSON.stringify(form);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const endpoint = 'contact-us-anon'; //secure ? CONST.CONTACT_US_ENDPOINT : CONST.CONTACT_US_ANON_ENDPOINT;
        return this.httpClient.post<ResultMessage>(urlJoin(this.baseUrl, endpoint), body, { headers });
    }

    public getAccess(formName: string): Observable<ResultMessage> {
        const params = new HttpParams().set('formName', formName);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.get<ResultMessage>(urlJoin(this.baseUrl, 'has-email-access'), { headers, params });
    }
}

export interface ResultMessage {
    message: string;
    code?: string;
}

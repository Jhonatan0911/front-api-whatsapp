import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SendMessageService } from 'src/app/services/send-message.service';
@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  constructor(
    public service:SendMessageService
  ) { }

  loading: any;
  form = new FormGroup({
    var1: new FormControl('', [Validators.required]),
    var2: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    plantilla: new FormControl('variables', [Validators.required]),
  })

  ngOnInit(): void {
  }

  submit(){
    this.form.value.plantilla = "variables";
    if(this.form.valid){

      this.form.disable()
      this.loading = true;


      let data = {
        messaging_product: "whatsapp",
        to: "57" + this.form.value.phone,
        type: "template",
        template: {
            name: this.form.value.plantilla,
            language: {
              code: "es"
            },
            components: [
                {
                    type: "body",
                    parameters: [
                        {
                          type: "text",
                          text: this.form.value.var1
                        },
                        {
                          type: "text",
                          text: this.form.value.var2
                        }
                    ]
                }
            ]
        }
      }

      this.service.send(data).subscribe({
        next: (req:any) => {
          console.log(req)
          this.loading = false;
          alert('Enviado Correctamente');
        },
        error: (err: string) => {
          console.log(err)
          this.loading = false;
          alert(err);
        },
        complete: () => {
          this.loading = false;
          this.form.reset();
          this.form.enable();
        },
      });

    }
  }

}
